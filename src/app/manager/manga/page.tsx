import ManagerManga from "@/components/manager/manga";
import { ApiResponse, Manga } from "@/types/types";
import request from "@/util/request";
import { faPen, faSort, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const metadata = {
  title: "Manga List - Mangaclub",
};

export const revalidate = 0;

async function getManga(): Promise<Array<Manga>> {
  const res: ApiResponse = await request.get("manga?paging=none&sort=latest");
  return res.payload.mangaList;
}

export default async function Page() {
  const manga: Array<Manga> = await getManga();
  return <ManagerManga mangas={manga}></ManagerManga>;
}
