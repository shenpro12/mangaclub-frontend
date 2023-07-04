"use client";
import { Chapter } from "@/types/types";
import styled from "./chapter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import PageControl from "../manga/pageControl";

export default function ManagerChapter({
  chapters,
  mangaId,
}: {
  chapters: Array<Chapter>;
  mangaId: string;
}) {
  const getPages = (maxPage: number, currPage: number) => {
    let pages: Array<number> = [];
    for (let i = currPage - 2; i <= currPage + 2 && i <= maxPage; i++) {
      if (i > 0) {
        pages.push(i);
      }
    }
    return pages;
  };
  const [initChapters, setInitChapters] = useState<Array<Chapter>>(chapters);
  const [renderList, setRenderList] = useState<Array<Chapter>>(chapters);
  const page_size: number = 1;
  const [maxPage, setMaxPage] = useState<number>(
    Math.ceil(initChapters.length / page_size)
  );
  const [currPage, setCurrPage] = useState<number>(1);
  const [pages, setPages] = useState<Array<number>>(
    getPages(maxPage, currPage)
  );
  const [chapterList, setChapterList] = useState<Array<Chapter>>(
    renderList.slice(page_size * currPage - page_size, page_size * currPage)
  );
  const [checkedChapterList, setCheckedChapterList] = useState<Array<string>>(
    []
  );

  const changePageHandle = (page: number) => {
    setChapterList(
      renderList.slice(page_size * page - page_size, page_size * page)
    );
    setPages(getPages(maxPage, page));
    setCheckedChapterList([]);
    let input: any = document.querySelector("#checkAll_input");
    input.checked = false;
    setCurrPage(page);
  };

  const checkboxHandle = (e: any) => {
    if (e.target.checked) {
      setCheckedChapterList([...checkedChapterList, e.target.value]);
    } else {
      setCheckedChapterList(
        checkedChapterList.filter((i) => (i === e.target.value ? false : true))
      );
    }
  };

  const checkAllHandle = (e: any) => {
    let elements: any = document.querySelectorAll("#chapter_item_input");
    //
    function checkAll(ele: any) {
      let temp = [];
      for (let i = 0; i < ele.length; i++) {
        ele[i].checked = true;
        temp.push(ele[i].value);
      }
      setCheckedChapterList(temp);
    }
    function unCheckAll(ele: any) {
      for (let i = 0; i < ele.length; i++) {
        ele[i].checked = false;
      }
      setCheckedChapterList([]);
    }
    //
    if (e.target.checked) {
      checkAll(elements);
    } else {
      if (checkedChapterList.length < elements.length) {
        checkAll(elements);
        e.target.checked = true;
        return;
      }
      unCheckAll(elements);
    }
  };

  const searchChapterHandle = (e: any) => {
    if (e.target.value) {
      let result = chapters.filter((i) =>
        i.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
      setRenderList(result);
    } else {
      setRenderList(chapters);
    }
  };

  useEffect(() => {
    setMaxPage(Math.ceil(renderList.length / page_size));
    setCurrPage(1);
    setPages(getPages(Math.ceil(renderList.length / page_size), 1));
    setChapterList(renderList.slice(page_size * 1 - page_size, page_size * 1));
    setCheckedChapterList([]);
    let input: any = document.querySelector("#checkAll_input");
    input.checked = false;
  }, [renderList]);

  return (
    <div className={styled.wrap}>
      <h1 className="font-semibold text-white text-2xl py-6 px-8 border-b border-white/10">
        Chapter list
      </h1>
      <section className="px-8 py-3 text-white/70 border-t border-white/10 w-full flex items-center relative">
        <FontAwesomeIcon icon={faSearch} className="w-4 h-4"></FontAwesomeIcon>
        <input
          className="flex-1 text-white bg-transparent outline-none ml-5"
          placeholder="enter chapter title"
          onChange={searchChapterHandle}
        />
      </section>
      <section
        className={`flex px-8 text-black/80 overflow-hidden bg-transparent justify-between items-center duration-300 border-white/10 ${
          checkedChapterList.length ? "h-14 bg-white border-t" : "h-0"
        }`}
      >
        <div>
          <p className="font-semibold">
            {checkedChapterList.length} Selected of {renderList.length}
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
                className=" hover:cursor-pointer"
                onChange={checkAllHandle}
                id="checkAll_input"
              />
            </th>
            <th className="py-3 px-2 text-left">Chapter title</th>
            <th className="py-3 px-2">Order</th>
            <th className="py-3 px-2">Total image</th>
            <th className="py-3 px-2">Date Modified</th>
            <th className="py-3 px-2">UpdatedAt</th>
          </tr>
          {chapterList.map((i) => (
            <tr
              key={i.id}
              className="border-b border-white/10 duration-150 hover:bg-neutral-900 [&>td>section>section]:hover:opacity-100"
            >
              <td className="py-3 px-4 pl-8 text-center">
                <input
                  type="checkbox"
                  id="chapter_item_input"
                  value={i.id}
                  className=" hover:cursor-pointer"
                  onChange={checkboxHandle}
                />
              </td>
              <td className="py-3 px-2">
                <section className="flex justify-between items-center">
                  <p className="text-white">{i.title}</p>
                  <section className=" flex items-center py-3 text-white/60 opacity-0">
                    <Link
                      href={`/manga-editor/${mangaId}/chapter/${i.id}/edit`}
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
              <td className="py-3 px-2 text-center text-white">{i.order}</td>
              <td className="py-3 px-2 text-center text-white">
                {i.images.length}
              </td>
              <td className="py-3 px-2 text-center text-white">
                {new Date(i.createdAt).toLocaleDateString("en-US")}
              </td>
              <td className="py-3 px-2 text-center text-white">
                {new Date(i.updatedAt).toLocaleDateString("en-US")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!renderList.length ? (
        <p className="text-center w-full text-white/70 mt-5 text-sm">
          Not found!
        </p>
      ) : (
        ""
      )}
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
