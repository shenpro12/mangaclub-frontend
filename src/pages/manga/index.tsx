import GenreList from "@/components/genre/genre";
import SiteLayout from "@/components/layouts/siteLauout";
import PagingContent from "@/components/mangaPaging/pagingContent";
import PagingControl from "@/components/mangaPaging/pagingControl";
import PagingFilter from "@/components/mangaPaging/pagingFilter";
import { Manga } from "@/types/manga";
import request from "@/util/request";
import Head from "next/head";

export default function MangaColectionPage({
  mangaList,
  genres,
}: {
  mangaList: Array<Manga>;
  genres: Array<any>;
}) {
  return (
    <div>
      <Head>
        <title>Adaptation Archives - Mangaclub</title>
      </Head>
      <GenreList genreList={genres}></GenreList>
      <SiteLayout
        title="List All Manga English From Mangaclub"
        header="All Mangas"
        sideBarData={[]}
        sideBarHeader="Most View"
      >
        <>
          <PagingFilter></PagingFilter>
          <PagingContent></PagingContent>
          <PagingControl></PagingControl>
        </>
      </SiteLayout>
    </div>
  );
}

export async function getStaticProps() {
  try {
    let [mangaList, genres] = await Promise.all([
      request.get("manga"),
      request.get("genre"),
    ]);
    if (!mangaList && !genres) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    return {
      props: {
        mangaList,
        genres,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
