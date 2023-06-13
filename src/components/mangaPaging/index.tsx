import { ApiResponse, ResponseMangaInfo } from "@/types/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PagingFillter from "./pagingFillter";
import PagingContent from "./pagingContent";
import PagingControl from "./pagingControl";
import request from "@/util/request";
import getUrlQuery from "@/util/getUrlQuery";
import PageLoading from "../loading/pageLoading";

export interface ChangeSortCallback {
  (sort: "latest" | "alphabet" | "rating" | "views"): void;
}

export default function PagingContainer({
  mangaInfo,
  redirectUrl,
}: {
  mangaInfo: ResponseMangaInfo;
  redirectUrl: string;
}) {
  const router = useRouter();
  let [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ResponseMangaInfo>(mangaInfo);

  const setSortHandle: ChangeSortCallback = (
    sort: "latest" | "alphabet" | "rating" | "views"
  ) => {
    changeQueryHandle(sort, 1);
  };

  const setCurrentPageHadle = (page: number) => {
    if (page !== data.page) {
      changeQueryHandle(page);
    }
  };

  const changeQueryHandle = (query: number | string, page?: number) => {
    const queryParams: string = getUrlQuery({
      ...router.query,
      sort: typeof query === "string" ? query : router.query.sort,
      page: page
        ? page
        : typeof query === "number"
        ? query.toString()
        : router.query.page,
    });
    router.push(`/${redirectUrl}${queryParams ? queryParams : ""}`, undefined, {
      shallow: true,
    });
  };

  const reFetchDataHandle = async () => {
    setLoading(true);
    const queryParams: string = getUrlQuery(router.query);
    const res: ApiResponse = await request.get(
      `${redirectUrl}${queryParams ? queryParams : ""}`
    );
    setData(res.payload);
    setLoading(false);
  };

  useEffect(() => {
    reFetchDataHandle();
  }, [router]);

  return data.mangaList.length ? (
    <div>
      <PagingFillter
        onChoose={setSortHandle}
        totalItem={data.totalItem}
        currSort={router.query.sort}
      ></PagingFillter>
      {loading ? (
        <PageLoading></PageLoading>
      ) : (
        <>
          <PagingContent mangaList={data.mangaList}></PagingContent>
          <PagingControl
            onChoosePage={setCurrentPageHadle}
            currPage={data.page}
            maxPage={data.maxPage}
            pages={data.pages}
          ></PagingControl>
        </>
      )}
    </div>
  ) : (
    <div>
      <img src="/404.png" width={200} height={200} className="mx-auto py-10" />
      <h1 className="text-center font-semibold text-black/70">
        We not found any Manga with your request. Please try again!
      </h1>
    </div>
  );
}
