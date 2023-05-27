import {
  faArrowDownLong,
  faArrowUpLong,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styled from "./mangaDetail.module.css";

export default function MangaChapter({
  chapters,
  mangaSlug,
}: {
  chapters: Array<any>;
  mangaSlug: string;
}) {
  const [chapterList, setChapterList] = useState<Array<any>>(chapters);
  const [collapBtn, setCollapBtn] = useState<boolean>(true);
  let chapterContainer = useRef<any>();
  let chapterContent = useRef<any>();
  const reverseChapter = () => {
    setChapterList([...chapterList].reverse());
  };
  useEffect(() => {
    let dateList: NodeList = document.querySelectorAll("#date");
    dateList.forEach((element: any) => {
      let now: any = new Date();
      let chapterDate: any = new Date(element.dataset.date);
      let total_seconds = Math.abs(chapterDate - now) / 1000;
      var days_difference = Math.floor(total_seconds / (60 * 60 * 24));
      if (days_difference <= 2) {
        element.innerHTML = `<img src=${"/new.gif"} alt="new chapter" style="max-height:16px; min-height:16px; max-width:30px; min-width:30px"/>`;
      } else {
        element.innerHTML = `${new Date(
          element.dataset.date
        ).toLocaleDateString()}`;
      }
    });
  }, []);
  useEffect(() => {
    if (
      chapterContainer.current.clientHeight >
      chapterContent.current.clientHeight
    ) {
      setCollapBtn(false);
      chapterContainer.current.style.height = "min-content";
    }
  }, []);
  const showAllChapterHandle = () => {
    chapterContainer.current.style.height = "max-content";
    setCollapBtn(false);
  };
  return (
    <div>
      <div className="flex items-center uppercase border-b-2 border-black/10 mb-7 mt-2">
        <div className=" w-8 h-8 bg-mainColor text-white text-lg mr-5 flex justify-center items-center relative">
          <FontAwesomeIcon icon={faStar} className="z-10"></FontAwesomeIcon>
          <div className="absolute bg-mainColor rotate-45 -right-1 w-3 h-3"></div>
        </div>
        <h2 className=" text-lg font-semibold mr-7">MANGA RELEASES</h2>
        <span
          className="hover:cursor-pointer hover:text-mainColor duration-150 text-sm"
          onClick={reverseChapter}
        >
          <FontAwesomeIcon icon={faArrowUpLong}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faArrowDownLong}></FontAwesomeIcon>
        </span>
      </div>
      <div
        ref={chapterContainer}
        className="w-full h-96 overflow-hidden relative"
      >
        {collapBtn && (
          <div
            className={`absolute bottom-0 w-full h-14 ${styled.overlay}`}
          ></div>
        )}
        <div
          ref={chapterContent}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3"
        >
          {chapterList.map((chapter) => (
            <Link
              href={`${mangaSlug}/${chapter.slug}`}
              key={chapter.id}
              className="border-b border-black/10 pr-5 py-2 flex flex-wrap"
            >
              <p className="font-semibold hover:text-mainColor duration-150 mr-3 my-auto">
                {chapter.title}
              </p>
              <span
                id="date"
                className="text-black/80 my-auto text-sm flex-1 text-right sm:text-left h-max w-max flex justify-end sm:inline"
                data-date={chapter.createdAt}
              ></span>
            </Link>
          ))}
        </div>
      </div>
      {collapBtn && (
        <div className="flex items-center text-black/60 text-sm justify-center hover:text-mainColor duration-150">
          <h1
            className="font-semibold hover:cursor-pointer inline-block mr-2"
            onClick={showAllChapterHandle}
          >
            Show more
          </h1>
        </div>
      )}
    </div>
  );
}
