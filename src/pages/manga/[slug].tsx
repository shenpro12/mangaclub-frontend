import { Manga } from "@/types/manga";
import request from "@/util/request";
import { useRouter } from "next/router";
import Custom404 from "../404";
import PageLoading from "@/components/loading/pageLoading";
import MangaSummry from "@/components/mangaDetail/mangaSummary";
import Head from "next/head";
import SiteLayout from "@/components/layouts/siteLauout";
import MangaDescription from "@/components/mangaDetail/mangaDescription";

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
  const { slug } = context.params;
  const manga = await request.get(`manga/${slug}`);
  return {
    props: { manga },
  };
}
