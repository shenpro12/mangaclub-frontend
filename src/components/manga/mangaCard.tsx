import { Manga } from "@/types/types";
import Link from "next/link";
import styled from "./mangaCard.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function MangaCard({
  manga,
  imageWidth,
  sidebarStyle,
  chapterDate,
}: {
  manga: Manga;
  imageWidth: 100 | 60;
  sidebarStyle?: boolean;
  chapterDate?: boolean;
}) {
  const [ratingPoint, setRatingPoint] = useState<number>(
    manga.ratings.reduce((total, curr: any) => total + curr.point, 0) /
      manga.ratings.length
  );
  useEffect(() => {
    if (!chapterDate) {
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
    }
  }, []);
  return (
    <div className="flex py-7 border-b border-black/10">
      <div className={`mr-5 ${styled[`w_${imageWidth}`]}`}>
        <div className="w-full h-min overflow-hidden">
          <Link href={`/manga/${manga.slug}`}>
            <img src={manga.thumb_url} className={styled.image} />
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <h3
          className={`font-medium hover:text-mainColor duration-200 mb-2 ${
            sidebarStyle && "text-xs"
          }`}
        >
          <Link href={`/manga/${manga.slug}`}>{manga.name}</Link>
        </h3>
        {!sidebarStyle && (
          <div className="flex">
            <div>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <FontAwesomeIcon
                  key={item}
                  icon={faStar}
                  className={`${
                    index < ratingPoint ? "text-yellow-300" : "text-zinc-400/80"
                  } text-sm`}
                ></FontAwesomeIcon>
              ))}
            </div>
            <p className="text-sm font-semibold my-auto ml-1">{ratingPoint}</p>
          </div>
        )}
        {manga.chapters.length
          ? manga.chapters.slice(0, 2).map((chapter) => (
              <Link
                href={`/manga/${manga.slug}/${chapter.slug}`}
                key={chapter.id}
                className="pr-5 my-3 flex flex-wrap items-center"
              >
                <div className="flex-1">
                  <p
                    className={`font-bold hover:text-white hover:bg-mainColor break-normal inline-block duration-150 mr-3 my-auto bg-zinc-200/80 px-3 text-black/40 rounded-md ${
                      sidebarStyle && "text-sm"
                    }`}
                  >
                    {chapter.slug.replace(/\-/, " ").replace(/\-/g, ".")}
                  </p>
                </div>
                <span
                  id="date"
                  className="text-black/90 my-auto text-sm "
                  data-date={chapter.createdAt}
                ></span>
              </Link>
            ))
          : ""}
      </div>
    </div>
  );
}
