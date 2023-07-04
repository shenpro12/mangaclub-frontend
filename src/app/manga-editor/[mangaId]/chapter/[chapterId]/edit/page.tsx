import EditChapter from "@/components/manager/editChapter";
import { ApiResponse, Chapter } from "@/types/types";
import request from "@/util/request";

export const revalidate = 0;

async function getMangaById(id: string): Promise<Chapter> {
  let res: ApiResponse = await request.get(`manga/chapter/${id}`);
  return res.payload;
}
export default async function Page({
  params,
}: {
  params: { chapterId: string };
}) {
  const chapter = await getMangaById(params.chapterId);
  return <EditChapter chapter={chapter}></EditChapter>;
}
