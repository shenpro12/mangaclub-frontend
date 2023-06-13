import {
  faArrowLeftLong,
  faArrowRightLong,
  faCircleInfo,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "./chapter.module.css";
import { Chapter } from "@/types/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ChapterControl({
  subChapter,
  mangaSlug,
  chapterSlug,
}: {
  subChapter: Array<Chapter>;
  mangaSlug: string;
  chapterSlug: string;
}) {
  const router = useRouter();
  const selectChapterHandle = (e: any) => {
    router.push(`/manga/${mangaSlug}/${e.target.value}`);
  };
  const [nextUrl, setNextUrl] = useState<string>();
  const [prevUrl, setPrevUrl] = useState<string>();

  const getSelectValue = () => {
    let selected: string = "";
    for (let i = 0; i < subChapter.length; i++) {
      if (subChapter[i].slug === chapterSlug) {
        selected = subChapter[i].slug;
      }
    }
    return selected;
  };

  useEffect(() => {
    for (let i = 0; i < subChapter.length; i++) {
      let bool = subChapter[i].slug === chapterSlug;

      if (bool && i == 0 && subChapter[i + 1]) {
        setPrevUrl("");
        setNextUrl(`/manga/${mangaSlug}/${subChapter[i + 1].slug}`);
      } else if (bool && i > 0 && i < subChapter.length - 1) {
        setNextUrl(`/manga/${mangaSlug}/${subChapter[i + 1].slug}`);
        setPrevUrl(`/manga/${mangaSlug}/${subChapter[i - 1].slug}`);
      } else if (bool && i == subChapter.length - 1 && subChapter[i - 1]) {
        setPrevUrl(`/manga/${mangaSlug}/${subChapter[i - 1].slug}`);
        setNextUrl("");
      } else if (subChapter.length == 1) {
        setPrevUrl("");
        setNextUrl("");
      }
    }
  }, [chapterSlug]);
  return (
    <div
      className={`flex items-center flex-wrap ${styled.container} ${styled.control_container}`}
    >
      <div className={styled.c_picker_container}>
        <FontAwesomeIcon
          icon={faSort}
          className="absolute top-2/4 right-3 -translate-y-2/4 w-5 text-black/50"
        ></FontAwesomeIcon>
        <select
          value={getSelectValue()}
          className={styled.c_picker}
          onChange={selectChapterHandle}
        >
          {subChapter.map((chapter) => (
            <option key={chapter.id} value={chapter.slug}>
              {chapter.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex text-white font-medium">
        {prevUrl && (
          <Link
            href={prevUrl}
            className="flex items-center bg-mainColor rounded mx-1 px-4 py-2 hover:bg-black duration-150"
          >
            <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>
            <p className="ml-2">Prev</p>
          </Link>
        )}
        {nextUrl && (
          <Link
            href={nextUrl}
            className="flex items-center bg-mainColor rounded mx-1 px-4 py-2 hover:bg-black duration-150"
          >
            <p className="mr-2">Next</p>
            <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
          </Link>
        )}
        {(!prevUrl && !nextUrl) || (prevUrl && !nextUrl) ? (
          <Link
            href={`/manga/${mangaSlug}`}
            className="flex items-center bg-mainColor rounded mx-1 px-4 py-2 hover:bg-black duration-150"
          >
            <p className="mr-2">Manga Info</p>
            <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
