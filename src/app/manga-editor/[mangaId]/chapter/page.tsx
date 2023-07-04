import ManagerChapter from "@/components/manager/chapter";
import { ApiResponse, Manga } from "@/types/types";
import request from "@/util/request";

export const metadata = {
  title: "Manga Chapters - Mangaclub",
};

export const revalidate = 0;

async function getMangaById(id: string): Promise<Manga> {
  let res: ApiResponse = await request.get(`manga/id/${id}`);
  return res.payload;
}
export default async function Page({
  params,
}: {
  params: { mangaId: string };
}) {
  const manga = await getMangaById(params.mangaId);
  return (
    <ManagerChapter
      chapters={manga.chapters}
      mangaId={params.mangaId}
    ></ManagerChapter>
  );
}
