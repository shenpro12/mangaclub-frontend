import GenreList from "@/components/genre/genre";
import SiteLayout from "@/components/layouts/siteLauout";
import PagingContainer from "@/components/mangaPaging";
import { Genres, Manga, ResponseMangaInfo } from "@/types/types";
import getUrlQuery from "@/util/getUrlQuery";
import request from "@/util/request";
import { GetServerSideProps } from "next";

export default function MangaColectionPage({
  mangaInfo,
  genres,
  sideBarData,
}: {
  mangaInfo: ResponseMangaInfo;
  genres: Array<Genres>;
  sideBarData: Array<Manga>;
}) {
  return (
    <div>
      <GenreList genreList={genres}></GenreList>
      <SiteLayout
        title="List All Manga English From Mangaclub"
        header="All Mangas"
        sideBarData={sideBarData}
        sideBarHeader="Most View"
      >
        <PagingContainer
          mangaInfo={mangaInfo}
          redirectUrl="manga"
        ></PagingContainer>
      </SiteLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryParams: string = getUrlQuery(query);
  const [mangaInfo, genres, sideBarData] = await Promise.all<any>([
    request.get(`manga${queryParams ? queryParams : ""}`),
    request.get("genre"),
    request.get("manga?paging=none&sort=views"),
  ]);
  return {
    props: {
      mangaInfo: mangaInfo.payload,
      genres: genres.payload,
      sideBarData: sideBarData.payload.mangaList.slice(0, 9),
    },
  };
};
