import { Manga } from "@/types/manga";
import Link from "next/link";
import styled from "./mangaCard.module.css";

export default function MangaCard({
  manga,
  imageWidth,
}: {
  manga: Manga;
  imageWidth: 100 | 60;
}) {
  return (
    <div className="flex py-7 pr-7 border-b border-black/10">
      <div className={`mr-5 overflow-hidden ${styled[`w_${imageWidth}`]}`}>
        <Link href={`manga/${manga.slug}`}>
          <img src={manga.thumb_url} className={styled.image} />
        </Link>
      </div>
      <div className="">
        <h3 className="font-medium float-right hover:text-mainColor duration-200">
          <Link href="/">{manga.name}</Link>
        </h3>
      </div>
    </div>
  );
}
