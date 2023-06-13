import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MangaCard from "../manga/mangaCard";
import { faSpinner, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import fetchApiWithToken from "@/util/fetchApiWithToken";
import { signOut } from "next-auth/react";

export default function Bookmark({
  bookmarks,
  session,
  updateSession,
  onChangeBookmark,
}: {
  bookmarks: Array<any>;
  session: any;
  updateSession: any;
  onChangeBookmark: any;
}) {
  const [bookmarkList, setBookmarkList] = useState<Array<any>>(
    bookmarks.sort(
      (a, b) =>
        Date.parse(b.updatedAt.toString()) - Date.parse(a.updatedAt.toString())
    )
  );
  const [deleteList, setDeleteList] = useState<Array<string>>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const deleteCheckboxHandle = (e: any) => {
    if (e.target.checked) {
      setDeleteList([...deleteList, e.target.value]);
    } else {
      setDeleteList(
        deleteList.filter((i) => (i === e.target.value ? false : true))
      );
    }
  };
  const checkAllHandle = (e: any) => {
    let elements: any = document.querySelectorAll("#delete_item_checkbox");
    //
    function checkAll(ele: any) {
      let temp = [];
      for (let i = 0; i < ele.length; i++) {
        ele[i].checked = true;
        temp.push(ele[i].value);
      }
      setDeleteList(temp);
    }
    function unCheckAll(ele: any) {
      for (let i = 0; i < ele.length; i++) {
        ele[i].checked = false;
      }
      setDeleteList([]);
    }
    //
    if (e.target.checked) {
      checkAll(elements);
    } else {
      if (deleteList.length < elements.length) {
        checkAll(elements);
        e.target.checked = true;
        return;
      }
      unCheckAll(elements);
    }
  };

  const deleteBookmarkByListsHandle = async () => {
    if (deleteList.length) {
      setLoading(true);
      const { results, status, newAT } = await fetchApiWithToken(
        ["account/bookmark/listDelete"],
        "post",
        session.user.accessToken,
        session.user.refeshToken,
        { bookmarksId: deleteList }
      );
      if (status === "unauthenticated" || !results) {
        signOut({ callbackUrl: "/" });
      }
      if (newAT) {
        updateSession({ newAT: newAT });
      }
      if (results) {
        const [deleteItem] = results;
        let newDeleteList = [...deleteList];
        let newBookmarkList = [...bookmarkList];
        for (let i = 0; i < deleteItem.payload.length; i++) {
          let temp: string = deleteItem.payload[i].id;
          newBookmarkList = newBookmarkList.filter((j) => j.id !== temp);
          newDeleteList = newDeleteList.filter((j) => j !== temp);
        }
        setBookmarkList(newBookmarkList);
        setDeleteList(newDeleteList);
      }

      setLoading(false);
    }
  };

  const deleteBookmarkHandle = async (id: string) => {
    setLoading(true);
    const { results, status, newAT } = await fetchApiWithToken(
      ["account/bookmark/deleteOne"],
      "post",
      session.user.accessToken,
      session.user.refeshToken,
      { bookmarkId: id }
    );
    if (status === "unauthenticated" || !results) {
      signOut({ callbackUrl: "/" });
    }
    if (newAT) {
      updateSession({ newAT: newAT });
    }
    if (results) {
      const [deleteItem] = results;
      setBookmarkList(
        bookmarkList.filter((i) =>
          i.id === deleteItem.payload.id ? false : true
        )
      );
      setDeleteList(
        deleteList.filter((i) => (i === deleteItem.payload.id ? false : true))
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    onChangeBookmark(bookmarkList);
  }, [bookmarkList]);
  return (
    <div>
      {loading && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/30 z-50 text-white flex justify-center items-center text-2xl">
          <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
        </div>
      )}
      <table className="w-full">
        <tbody>
          <tr>
            <th className="bg-zinc-200 p-2 text-black/80">Manga Name</th>
            <th className="bg-zinc-200 p-2 text-black/80">Update Time</th>
            <th className="bg-zinc-200 p-2 text-black/80">Edit</th>
          </tr>
          {bookmarkList.map((bookmark) => (
            <tr key={bookmark.id}>
              <td>
                <MangaCard
                  sidebarStyle={true}
                  imageWidth={60}
                  manga={bookmark.manga}
                  chapterDate={true}
                ></MangaCard>
              </td>
              <td className="text-center px-1">
                {new Date(bookmark.updatedAt).toLocaleDateString()}
              </td>
              <td className="text-center px-1">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="text-black/50 hover:text-red-600 duration-150 hover:cursor-pointer mr-2"
                  onClick={() => deleteBookmarkHandle(bookmark.id)}
                ></FontAwesomeIcon>
                <input
                  type="checkbox"
                  id="delete_item_checkbox"
                  value={bookmark.id}
                  className="hover:cursor-pointer"
                  onChange={deleteCheckboxHandle}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {bookmarkList.length ? (
        <div className="mt-5 flex justify-end w-full">
          <div className="flex items-center mr-5 text-black/60 font-semibold">
            <input
              type="checkbox"
              className="mr-2"
              id="checkall_checkbox"
              onChange={checkAllHandle}
            />
            <label
              className=" hover:cursor-pointer hover:text-black duration-150"
              htmlFor="checkall_checkbox"
            >
              Check all
            </label>
          </div>
          <button
            className="rounded-full bg-mainColor px-4 py-1 font-semibold text-white hover:bg-black duration-150"
            onClick={deleteBookmarkByListsHandle}
          >
            Delete
          </button>
        </div>
      ) : (
        <h1 className="w-full text-black/60 mt-5 font-semibold text-center">
          No Manga Bookmarked!
        </h1>
      )}
    </div>
  );
}
