import Link from "next/link";

import styled from "./chapter.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import fetchApiWithToken from "@/util/fetchApiWithToken";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SiteNotify from "../siteNotify/siteNotify";
export default function Header({
  mangaName,
  chapterSlug,
  mangaSlug,
  mangaId,
}: {
  mangaName: string;
  chapterSlug: string;
  mangaSlug: string;
  mangaId: string;
}) {
  const { data: session, update } = useSession();

  const [userBookmark, setUserBookmark] = useState<
    undefined | { bookmarkId: string; isBookmark: boolean }
  >(undefined);
  const [notify, setNotify] = useState<{
    type: "warning" | "error" | "ok" | "";
    message: string;
  }>({ type: "", message: "" });

  const bookmarkHandle = async () => {
    if (!session?.user) {
      setNotify({ type: "error", message: "Please login!" });
      return;
    }
    if (typeof userBookmark === "object" && userBookmark.isBookmark) {
      let user: any = session?.user;
      let bookmarkData: any = userBookmark;
      const { results, status, newAT } = await fetchApiWithToken(
        ["account/bookmark/deleteOne"],
        "delete",
        user.accessToken,
        user.refeshToken,
        { bookmarkId: bookmarkData.bookmarkId }
      );
      if (status === "unauthenticated" || !results) {
        signOut({ redirect: false });
      }
      if (newAT) {
        update({ newAT: newAT });
      }
      if (results) {
        let [data] = results;
        if (data.payload.id === userBookmark.bookmarkId) {
          setUserBookmark({ isBookmark: false, bookmarkId: "" });
        }
      }
    } else if (typeof userBookmark === "object" && !userBookmark.isBookmark) {
      let user: any = session?.user;
      const { results, status, newAT } = await fetchApiWithToken(
        ["account/bookmark/add"],
        "put",
        user.accessToken,
        user.refeshToken,
        { mangaId: mangaId }
      );
      if (status === "unauthenticated" || !results) {
        signOut({ redirect: false });
      }
      if (newAT) {
        update({ newAT: newAT });
      }
      if (results) {
        let [data] = results;
        setUserBookmark({ isBookmark: true, bookmarkId: data.payload.id });
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (session) {
        let user: any = session.user;
        const { results, status, newAT } = await fetchApiWithToken(
          ["account/bookmark/isBookmark"],
          "post",
          user.accessToken,
          user.refeshToken,
          { mangaId: mangaId }
        );
        if (status === "unauthenticated" || !results) {
          signOut({ redirect: false });
          setUserBookmark({ isBookmark: false, bookmarkId: "" });
        }
        if (newAT) {
          update({ newAT: newAT });
        }
        if (results) {
          let [data] = results;
          setUserBookmark({
            isBookmark: data.payload.isBookmark,
            bookmarkId: data.payload.bookmarkId,
          });
        }
      } else {
        setUserBookmark({ isBookmark: false, bookmarkId: "" });
      }
    })();
  }, [session]);

  return (
    <div className={styled.container}>
      <SiteNotify
        onClose={() => setNotify({ type: "", message: "" })}
        type={notify.type}
        message={notify.message}
      ></SiteNotify>
      <h1 className=" font-bold text-3xl text-black/80 mt-7 mb-4">
        {mangaName} / {chapterSlug}
      </h1>
      <div className="flex justify-between text-sm text-black/50 font-medium pt-10 pb-7">
        <section className="flex-1">
          <Link className="hover:text-mainColor duration-150" href="/">
            Home
          </Link>{" "}
          /{" "}
          <Link className="hover:text-mainColor duration-150" href="/">
            All Mangas
          </Link>{" "}
          /{" "}
          <Link
            className="hover:text-mainColor duration-150"
            href={`/manga/${mangaSlug}`}
          >
            {mangaName}
          </Link>{" "}
          / <p className="inline text-black">{chapterSlug}</p>
        </section>
        <section className="ml-5">
          {typeof userBookmark === "object" && userBookmark.isBookmark && (
            <div className="w-10 h-10 flex justify-center items-center bg-zinc-100 rounded-full">
              <FontAwesomeIcon
                title="unBookmark this manga"
                className="hover:cursor-pointer text-mainColor/80 text-2xl mx-1"
                icon={faCheck}
                onClick={bookmarkHandle}
              ></FontAwesomeIcon>
            </div>
          )}
          {userBookmark !== undefined &&
            typeof userBookmark === "object" &&
            !userBookmark.isBookmark && (
              <div className="w-10 h-10 flex justify-center items-center bg-zinc-100 rounded-full">
                <FontAwesomeIcon
                  title="bookmark this manga"
                  className="hover:cursor-pointer text-mainColor/80 text-2xl mx-1"
                  icon={faBookmark}
                  onClick={bookmarkHandle}
                ></FontAwesomeIcon>
              </div>
            )}
        </section>
      </div>
    </div>
  );
}
