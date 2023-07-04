"use client";

import Navigate from "@/components/manager/navigate/navigate";
import "@/styles/globals.css";
import { ApiResponse, Manga } from "@/types/types";
import request from "@/util/request";
import { faFile, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import React from "react";

const getMangaById = async (mangaId: any): Promise<Manga> => {
  const res: ApiResponse = await request.get(`manga/id/${mangaId}`);
  const manga: Manga = res.payload;
  return manga;
};

export default function MangaEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const navigateData = [
    {
      title: "Edit",
      icon: faPenToSquare,
      redirect: `/manga-editor/${params?.mangaId}/edit`,
    },
    {
      title: "Chapter",
      icon: faFile,
      redirect: `/manga-editor/${params?.mangaId}/chapter`,
    },
  ];
  return (
    <React.Fragment>
      <Navigate navigateData={navigateData} type="sub"></Navigate>
      <div className="flex-1 h-full bg-neutral-800 relative">{children}</div>
    </React.Fragment>
  );
}
