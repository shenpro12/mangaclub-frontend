import { Manga } from "@/types/types";
import MangaCard from "../manga/mangaCard";

export default function PagingContent({
  mangaList,
}: {
  mangaList: Array<Manga>;
}) {
  return mangaList.length ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      {mangaList.map((manga) => (
        <MangaCard key={manga.id} manga={manga} imageWidth={100}></MangaCard>
      ))}
    </div>
  ) : (
    <h1 className="w-full text-center mt-8 text-black/60 font-semibold">
      There is no Manga found!
    </h1>
  );
}
