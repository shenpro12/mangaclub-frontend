import GenreList from "@/components/genre/genre";
import SiteLayout from "@/components/layouts/siteLauout";
import PagingContainer from "@/components/mangaPaging";
import { ApiResponse, Manga, ResponseMangaInfo } from "@/types/types";
import getUrlQuery from "@/util/getUrlQuery";
import request from "@/util/request";
import { GetServerSideProps } from "next";

export default function GenreColectionPage({
  mangaInfo,
  genres,
  genre,
  sideBarData,
}: {
  mangaInfo: ResponseMangaInfo;
  genres: Array<any>;
  genre: string;
  sideBarData: Array<Manga>;
}) {
  return (
    <div>
      <GenreList genreList={genres}></GenreList>
      <SiteLayout
        title={`${(genre.charAt(0).toUpperCase() + genre.slice(1)).replaceAll(
          "-",
          " "
        )} Archives - Mangaclub`}
        header={genre.replaceAll("-", " ")}
        sideBarData={sideBarData}
        sideBarHeader="Most View"
      >
        <PagingContainer
          mangaInfo={mangaInfo}
          redirectUrl={`manga-genre/${genre}`}
        ></PagingContainer>
      </SiteLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    let { genre } = query;
    let queryTemp = query;
    delete queryTemp["genre"];
    const queryParams: string = getUrlQuery(queryTemp);
    const [mangaInfo, genres, sideBarData] = await Promise.all<any>([
      request.get(`manga-genre/${genre}${queryParams ? queryParams : ""}`),
      request.get("genre"),
      request.get("manga?paging=none&sort=views"),
    ]);
    return {
      props: {
        mangaInfo: mangaInfo.payload,
        genres: genres.payload,
        genre,
        sideBarData: sideBarData.payload.mangaList.slice(0, 9),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
