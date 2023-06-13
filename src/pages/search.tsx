import PagingContainer from "@/components/mangaPaging";
import SearchBar from "@/components/searchBar/searchBar";
import { ResponseMangaInfo } from "@/types/types";
import getUrlQuery from "@/util/getUrlQuery";
import request from "@/util/request";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { createContext } from "react";

export const SearchContext = createContext<any>("");

export default function SearchPage({
  mangaInfo,
  genres,
}: {
  mangaInfo: ResponseMangaInfo;
  genres: Array<any>;
}) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{`You searched for ${
          router.query.keyword ? router.query.keyword : ""
        } - Mangaclash`}</title>
      </Head>
      <SearchBar genres={genres}></SearchBar>
      <SearchContext.Provider
        value={router.query.keyword ? router.query.keyword : ""}
      >
        <div className="site_container fixingContainerPadingX pt-8 pb-12">
          <PagingContainer
            mangaInfo={mangaInfo}
            redirectUrl="search"
          ></PagingContainer>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryParams: string = getUrlQuery(query);
  const [genres, mangaInfo] = await Promise.all<any>([
    request.get("genre"),
    request.get(`search${queryParams ? queryParams : ""}`),
  ]);
  return { props: { mangaInfo: mangaInfo.payload, genres: genres.payload } };
};
