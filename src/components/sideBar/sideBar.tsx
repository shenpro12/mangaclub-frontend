import { Manga } from "@/types/types";
import MangaCard from "../manga/mangaCard";
import Link from "next/link";

export default function SideBar({
  manga,
  header,
}: {
  manga: Array<Manga>;
  header: string;
}) {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="h-4 w-4 bg-mainColor absolute -bottom-2 left-3 rotate-45"></div>
        <h1 className="font-medium py-1 mt-2 bg-mainColor text-white inline-block px-5">
          {header}
        </h1>
      </div>

      {manga.map((manga) => (
        <MangaCard
          sidebarStyle={true}
          key={manga.id}
          manga={manga}
          imageWidth={60}
        ></MangaCard>
      ))}
      {manga.length ? (
        <Link
          href="/manga?sort=views"
          className="bg-mainColor text-center block text-white font-medium py-2 text-sm duration-150 hover:cursor-pointer hover:bg-black"
        >
          More
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
