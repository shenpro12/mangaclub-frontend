import { Manga } from "@/types/manga";
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

export default function MangaDetailPage({ manga }: { manga: Manga }) {
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
        sideBarData={[]}
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
          <Related></Related>
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
  const manga: Manga = await request.get(`manga/${mangaSlug}`);
  if (!manga) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  manga.chapters.sort((a, b) => b.order - a.order);
  return {
    props: { manga },
  };
}
