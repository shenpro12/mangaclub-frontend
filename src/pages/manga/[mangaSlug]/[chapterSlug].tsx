import ChapterContent from "@/components/chapter/chapterContent";
import ChapterControl from "@/components/chapter/chapterControl";
import Header from "@/components/chapter/header";
import PageLoading from "@/components/loading/pageLoading";
import Discussion from "@/components/mangaDetail/Discussion";
import Related from "@/components/mangaDetail/related";
import { ApiResponse, Chapter, Manga } from "@/types/types";
import request from "@/util/request";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ChapterPage({
  mainChapter,
  mangaName,
  mangaSlug,
  subChapter,
}: {
  mainChapter: Chapter;
  mangaName: string;
  mangaSlug: string;
  subChapter: Array<Chapter>;
}) {
  // console.log(mainChapter);
  const router = useRouter();
  if (router.isFallback) {
    return <PageLoading></PageLoading>;
  }
  return (
    <div className="site_container">
      <Head>
        <title>{`Read ${mangaName} | ${mainChapter.title}`}</title>
      </Head>
      <Header
        mangaName={mangaName}
        chapterSlug={mainChapter.slug}
        mangaSlug={mangaSlug}
      ></Header>
      <ChapterControl
        chapterSlug={mainChapter.slug}
        subChapter={subChapter}
        mangaSlug={mangaSlug}
      ></ChapterControl>
      {<ChapterContent imageList={mainChapter.images}></ChapterContent>}
      <ChapterControl
        chapterSlug={mainChapter.slug}
        subChapter={subChapter}
        mangaSlug={mangaSlug}
      ></ChapterControl>
      <br></br>
      <div className="fixingContainerPadingX">
        <Discussion
          header="chapter discussion"
          id={mainChapter.id}
          slug={mainChapter.slug}
          middleUrl={`manga/${mangaSlug}/`}
        ></Discussion>
        <Related></Related>
      </div>
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
  const { mangaSlug, chapterSlug } = context.params;
  const res: ApiResponse = await request.get(`manga/${mangaSlug}`);
  let manga: Manga = res.payload;
  for (let i = 0; i < manga.chapters.length; i++) {
    let slug = manga.chapters[i].slug;
    if (slug === chapterSlug) {
      return {
        props: {
          mainChapter: manga.chapters[i],
          mangaName: manga.name,
          mangaSlug: manga.slug,
          subChapter: manga.chapters.sort((a, b) => a.order - b.order),
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/404",
      permanent: false,
    },
  };
}
