import SiteLayout from "@/components/layouts/siteLauout";
import MangaCard from "@/components/manga/mangaCard";
import { ApiResponse, Manga } from "@/types/types";
import request from "@/util/request";
import { useEffect, useState } from "react";

export default function HomePage({ mangaList }: { mangaList: Array<Manga> }) {
  const [renderPerPage, setRenderPerPage] = useState(40);
  const [renderManga, setRenderManga] = useState<Array<Manga>>([]);
  useEffect(() => {
    let temp = [];
    for (let i = 0; i < renderPerPage && i < mangaList.length; i++) {
      temp.push(mangaList[i]);
    }
    setRenderManga(temp);
  }, [renderPerPage]);
  return (
    <SiteLayout
      title="Mangaclub - Read Manga Online"
      header="READ MANGA - LATEST UPDATES"
      sideBarData={mangaList.slice(0, 10)}
      sideBarHeader="Most View"
    >
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          {renderManga.map((manga) => (
            <MangaCard
              key={manga.id}
              manga={manga}
              imageWidth={100}
            ></MangaCard>
          ))}
        </div>
        {renderPerPage < mangaList.length && (
          <div
            className="text-center uppercase bg-zinc-200/50 border border-black/10 hover:cursor-pointer duration-150 hover:bg-mainColor hover:text-white py-3 font-medium text-sm"
            onClick={() => setRenderPerPage(renderPerPage + 2)}
          >
            <h1>Load more</h1>
          </div>
        )}
      </>
    </SiteLayout>
  );
}

export async function getStaticProps() {
  try {
    const res: ApiResponse = await request.get("manga?paging=none&sort=views");

    const mangaList: Array<Manga> = res.payload.mangaList;
    if (!mangaList) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    for (let i = 0; i < mangaList.length; i++) {
      mangaList[i].chapters.sort((a, b) => b.order - a.order);
    }
    return {
      props: {
        mangaList: mangaList,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
