import { ApiResponse, Manga } from "@/types/types";
import request from "@/util/request";
import { useRouter } from "next/router";
import Custom404 from "../../404";
import PageLoading from "@/components/loading/pageLoading";
import MangaSummry from "@/components/mangaDetail/mangaSummary";
import SiteLayout from "@/components/layouts/siteLauout";
import MangaDescription from "@/components/mangaDetail/mangaDescription";
import MangaChapter from "@/components/mangaDetail/mangaChapter";
import Discussion from "@/components/mangaDetail/Discussion";
import Related from "@/components/mangaDetail/related";
import { Chapter } from "@/types/types";
import getUrlQuery from "@/util/getUrlQuery";

export default function MangaDetailPage({
  manga,
  sideBarData,
  relatedManga,
}: {
  manga: Manga;
  sideBarData: Array<Manga>;
  relatedManga: Array<Manga>;
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <PageLoading></PageLoading>;
  }
  if (!manga) {
    return <Custom404></Custom404>;
  }
  return (
    <div>
      <MangaSummry manga={manga}></MangaSummry>
      <SiteLayout
        title={`Read ${manga.name} Manga Online`}
        header=""
        sideBarData={sideBarData}
        sideBarHeader="Most View"
      >
        <div>
          <MangaDescription description={manga.description}></MangaDescription>
          <MangaChapter
            chapters={manga.chapters}
            mangaSlug={manga.slug}
          ></MangaChapter>
          <Discussion
            id={manga.id}
            slug={manga.slug}
            header="manga discussion"
            middleUrl="manga"
          ></Discussion>
          <Related relatedManga={relatedManga}></Related>
        </div>
      </SiteLayout>
    </div>
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
export async function getStaticProps(context: any) {
  const { mangaSlug } = context.params;
  //const manga: ApiResponse = await request.get(`manga/${mangaSlug}`);
  const [manga, sideBarData] = await Promise.all<any>([
    request.get(`manga/${mangaSlug}`),
    request.get("manga?paging=none&sort=views"),
  ]);
  let mangalist = manga.payload;
  if (!mangalist) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  mangalist.chapters.sort((a: Chapter, b: Chapter) => b.order - a.order);
  const queryParams: string = getUrlQuery({
    genre: mangalist.categories.map((i: any) => i.slug),
    limit: 10,
  });
  let relatedManga: any = await request.get(
    `manga/related${queryParams ? queryParams : ""}`
  );
  return {
    props: {
      manga: mangalist,
      relatedManga: relatedManga.payload.mangaList.filter(
        (i: any) => mangalist.id !== i.id
      ),
      sideBarData: sideBarData.payload.mangaList.slice(0, 9),
    },
  };
}
