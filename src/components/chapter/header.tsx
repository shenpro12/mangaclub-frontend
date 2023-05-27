import Link from "next/link";

import styled from "./chapter.module.css";
export default function Header({
  mangaName,
  chapterSlug,
  mangaSlug,
}: {
  mangaName: string;
  chapterSlug: string;
  mangaSlug: string;
}) {
  return (
    <div className={styled.container}>
      <h1 className=" font-bold text-3xl text-black/80 mt-7 mb-4">
        {mangaName} / {chapterSlug}
      </h1>
      <div className=" text-sm text-black/50 font-medium pt-10 pb-7">
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
        / <p className="inline">{chapterSlug}</p>
      </div>
    </div>
  );
}
