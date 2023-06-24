"use client";
import { Manga } from "@/types/types";
import {
  faCheck,
  faPen,
  faSort,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "./manga.module.css";
import PageControl from "./pageControl";
import Link from "next/link";
import { mangaSort } from "@/util/sort";

export default function ManagerManga({ mangas }: { mangas: Array<Manga> }) {
  const getPages = (maxPage: number, currPage: number) => {
    let pages: Array<number> = [];
    for (let i = currPage - 2; i <= currPage + 2 && i <= maxPage; i++) {
      if (i > 0) {
        pages.push(i);
      }
    }
    return pages;
  };

  const page_size: number = 30;
  const maxPage = Math.ceil(mangas.length / page_size);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pages, setPages] = useState<Array<number>>(
    getPages(maxPage, currPage)
  );
  const [mangaList, setMangaList] = useState<Array<Manga>>(
    mangas.slice(page_size * currPage - page_size, page_size * currPage)
  );
  const [checkedMangaList, setCheckedMangaList] = useState<Array<string>>([]);
  const [toggleSort, setToggleSort] = useState<boolean>(false);
  const [currSort, setCurrSort] = useState<string>("none");

  const changePageHandle = (page: number) => {
    setMangaList(
      mangaSort(mangas, currSort).slice(
        page_size * page - page_size,
        page_size * page
      )
    );
    setPages(getPages(maxPage, page));
    setCheckedMangaList([]);
    let input: any = document.querySelector("#checkAll_input");
    input.checked = false;
    setCurrPage(page);
  };

  const checkboxHandle = (e: any) => {
    if (e.target.checked) {
      setCheckedMangaList([...checkedMangaList, e.target.value]);
    } else {
      setCheckedMangaList(
        checkedMangaList.filter((i) => (i === e.target.value ? false : true))
      );
    }
  };

  const checkAllHandle = (e: any) => {
    let elements: any = document.querySelectorAll("#manga_item_input");
    //
    function checkAll(ele: any) {
      let temp = [];
      for (let i = 0; i < ele.length; i++) {
        ele[i].checked = true;
        temp.push(ele[i].value);
      }
      setCheckedMangaList(temp);
    }
    function unCheckAll(ele: any) {
      for (let i = 0; i < ele.length; i++) {
        ele[i].checked = false;
      }
      setCheckedMangaList([]);
    }
    //
    if (e.target.checked) {
      checkAll(elements);
    } else {
      if (checkedMangaList.length < elements.length) {
        checkAll(elements);
        e.target.checked = true;
        return;
      }
      unCheckAll(elements);
    }
  };

  const sortHandle = (sortBy: string) => {
    setMangaList(
      mangaSort(mangas, sortBy).slice(
        page_size * currPage - page_size,
        page_size * currPage
      )
    );
    setToggleSort(false);
    setCurrSort(sortBy);
  };

  return (
    <div className={styled.wrap}>
      <h1 className="font-semibold text-white text-2xl py-6 px-8">
        Manga list
      </h1>
      <section className="px-8 py-3 text-white/70 border-t border-white/10 w-full flex items-center relative">
        <FontAwesomeIcon icon={faSort} className="w-4 h-4"></FontAwesomeIcon>
        <input
          className="flex-1 text-white bg-transparent outline-none ml-5"
          placeholder="Name"
          onFocus={() => setToggleSort(true)}
        />
        <ul
          className={`absolute top-full left-8 rounded py-2 bg-neutral-900 ${
            toggleSort ? "block" : "hidden"
          }`}
        >
          <li
            className="pb-1 px-5 hover:cursor-pointer flex items-center"
            onClick={() => sortHandle("none")}
          >
            <FontAwesomeIcon
              icon={faCheck}
              className={`mr-3 h-3 w-3 ${
                currSort === "none" ? "text-white/70" : "text-transparent"
              }`}
            ></FontAwesomeIcon>
            <p>None</p>
          </li>
          <li
            className="pb-1 px-5 hover:cursor-pointer flex items-center"
            onClick={() => sortHandle("latest")}
          >
            <FontAwesomeIcon
              icon={faCheck}
              className={`mr-3 h-3 w-3 ${
                currSort === "latest" ? "text-white/70" : "text-transparent"
              }`}
            ></FontAwesomeIcon>
            <p>UpdatedAt</p>
          </li>
          <li
            className="pb-1 px-5 hover:cursor-pointer flex items-center"
            onClick={() => sortHandle("views")}
          >
            <FontAwesomeIcon
              icon={faCheck}
              className={`mr-3 h-3 w-3 ${
                currSort === "views" ? "text-white/70" : "text-transparent"
              }`}
            ></FontAwesomeIcon>
            <p>View</p>
          </li>
          <li
            className="pb-1 px-5 hover:cursor-pointer flex items-center"
            onClick={() => sortHandle("rating")}
          >
            <FontAwesomeIcon
              icon={faCheck}
              className={`mr-3 h-3 w-3 ${
                currSort === "rating" ? "text-white/70" : "text-transparent"
              }`}
            ></FontAwesomeIcon>
            <p>Rating</p>
          </li>
          <li
            className="pb-1 px-5 hover:cursor-pointer flex items-center"
            onClick={() => sortHandle("alphabet")}
          >
            <FontAwesomeIcon
              icon={faCheck}
              className={`mr-3 h-3 w-3 ${
                currSort === "alphabet" ? "text-white/70" : "text-transparent"
              }`}
            ></FontAwesomeIcon>
            <p>Alphabet</p>
          </li>
          <li
            className="pb-1 px-5 hover:cursor-pointer flex items-center"
            onClick={() => sortHandle("createdAt")}
          >
            <FontAwesomeIcon
              icon={faCheck}
              className={`mr-3 h-3 w-3 ${
                currSort === "createdAt" ? "text-white/70" : "text-transparent"
              }`}
            ></FontAwesomeIcon>
            <p>Date modified</p>
          </li>
        </ul>
      </section>
      <section
        className={`flex px-8 text-black/80 overflow-hidden bg-transparent justify-between items-center duration-300 border-white/10 ${
          checkedMangaList.length ? "h-14 bg-white border-t" : "h-0"
        }`}
      >
        <div>
          <p className="font-semibold">
            {checkedMangaList.length} Selected of {mangaList.length}
          </p>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            className="hover:text-red-500 hover:cursor-pointer"
          ></FontAwesomeIcon>
        </div>
      </section>
      <table className="border-t border-white/10 w-full overflow-x-auto text-white/70 text-sm">
        <tbody>
          <tr className="border-b border-white/10">
            <th className="py-3 px-4 pl-8">
              <input
                type="checkbox"
                onChange={checkAllHandle}
                id="checkAll_input"
              />
            </th>
            <th className="py-3 px-2 text-left">Manga</th>
            <th className="py-3 px-2">Date Modified</th>
            <th className="py-3 px-2">UpdatedAt</th>
            <th className="py-3 px-2">Views</th>
            <th className="py-3 px-2">Ratings</th>
          </tr>
          {mangaList.map((i) => (
            <tr
              key={i.id}
              className="border-b border-white/10 duration-150 hover:bg-neutral-900 [&>td>section>section]:hover:flex"
            >
              <td className="py-3 px-4 pl-8 text-center">
                <input
                  type="checkbox"
                  id="manga_item_input"
                  value={i.id}
                  onChange={checkboxHandle}
                />
              </td>
              <td className="py-3 px-2 flex">
                <img src={i.thumb_url} className="mr-3 w-16" />
                <section>
                  <p className="text-white">{i.name}</p>
                  <section className="items-center py-3 text-white/60 hidden">
                    <Link
                      href={`/manga-editor/${i.id}/edit`}
                      className="pr-1 mr-1 hover:text-mainColor hover:cursor-pointer"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </Link>
                    <div
                      className="px-1 mx-1 hover:text-red-500 hover:cursor-pointer"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </div>
                  </section>
                </section>
              </td>
              <td className="py-3 px-2 text-center text-white">
                {new Date(i.createdAt).toLocaleDateString("en-US")}
              </td>
              <td className="py-3 px-2 text-center text-white">
                {new Date(i.updatedAt).toLocaleDateString("en-US")}
              </td>
              <td className="py-3 px-2 text-center text-white">{i.views}</td>
              <td className="py-3 px-2 text-center text-white">
                {i.ratings.reduce((total, curr: any) => total + curr.point, 0) /
                  i.ratings.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <section>
        <PageControl
          currPage={currPage}
          maxPage={maxPage}
          onChoosePage={changePageHandle}
          pages={pages}
        ></PageControl>
      </section>
    </div>
  );
}
