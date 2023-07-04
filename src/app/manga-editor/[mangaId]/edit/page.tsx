import EditManga from "@/components/manager/editManga";
import { ApiResponse, Genres, Manga } from "@/types/types";
import request from "@/util/request";

export const metadata = {
  title: "Manga Information - Mangaclub",
};

export const revalidate = 0;

async function getMangaById(id: string): Promise<Manga> {
  let res: ApiResponse = await request.get(`manga/id/${id}`);
  return res.payload;
}

async function getCategories(): Promise<Array<Genres>> {
  let res: ApiResponse = await request.get("genre");
  return res.payload;
}

export default async function Page({
  params,
}: {
  params: { mangaId: string };
}) {
  const [manga, genres] = await Promise.all([
    getMangaById(params.mangaId),
    getCategories(),
  ]);
  return <EditManga manga={manga} genres={genres}></EditManga>;
}
