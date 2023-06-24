import ChapterContent from "@/components/chapter/chapterContent";
import ChapterControl from "@/components/chapter/chapterControl";
import Header from "@/components/chapter/header";
import PageLoading from "@/components/loading/pageLoading";
import Discussion from "@/components/mangaDetail/Discussion";
import Related from "@/components/mangaDetail/related";
import { ApiResponse, Chapter, Manga } from "@/types/types";
import getUrlQuery from "@/util/getUrlQuery";
import request from "@/util/request";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ChapterPage({
  mainChapter,
  mangaName,
  mangaSlug,
  subChapter,
  relatedManga,
  mangaId,
}: {
  mainChapter: Chapter;
  mangaName: string;
  mangaSlug: string;
  subChapter: Array<Chapter>;
  relatedManga: Array<Manga>;
  mangaId: string;
}) {
  const router = useRouter();
  const [viewStyle, setViewStyle] = useState<"paged" | "list">(
    router.query.style === "paged" ? "paged" : "list"
  );

  useEffect(() => {
    if (router.query.style === "paged") {
      setViewStyle(router.query.style);
    } else {
      setViewStyle("list");
    }
  }, [router]);

  if (router.isFallback) {
    return <PageLoading></PageLoading>;
  }

  return (
    <div className="site_container pb-10">
      <Head>
        <title>{`Read ${mangaName} | ${mainChapter.title}`}</title>
      </Head>
      <Header
        mangaName={mangaName}
        chapterSlug={mainChapter.slug}
        mangaSlug={mangaSlug}
        mangaId={mangaId}
      ></Header>
      <ChapterControl
        chapterSlug={mainChapter.slug}
        subChapter={subChapter}
        mangaSlug={mangaSlug}
      ></ChapterControl>
      {
        <ChapterContent
          viewStyle={viewStyle}
          imageList={mainChapter.images}
        ></ChapterContent>
      }
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
        <Related relatedManga={relatedManga}></Related>
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

  const queryParams: string = getUrlQuery({
    genre: manga.categories.map((i: any) => i.slug),
    limit: 10,
  });
  let relatedManga: any = await request.get(
    `manga/related${queryParams ? queryParams : ""}`
  );

  for (let i = 0; i < manga.chapters.length; i++) {
    let slug = manga.chapters[i].slug;
    if (slug === chapterSlug) {
      return {
        props: {
          mangaId: manga.id,
          mainChapter: manga.chapters[i],
          mangaName: manga.name,
          mangaSlug: manga.slug,
          subChapter: manga.chapters.sort((a, b) => a.order - b.order),
          relatedManga: relatedManga.payload.mangaList.filter(
            (i: any) => manga.id !== i.id
          ),
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
