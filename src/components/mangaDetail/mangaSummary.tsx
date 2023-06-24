import { Manga } from "@/types/types";
import styled from "./mangaDetail.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCheck,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import { CommentCount } from "disqus-react";
import Rating from "./rating";
import { HOST_NAME, SHORT_NAME } from "@/constant";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import fetchApiWithToken from "@/util/fetchApiWithToken";
import { useRouter } from "next/router";
import SiteNotify from "../siteNotify/siteNotify";
export default function MangaSummry({ manga }: { manga: Manga }) {
  const disqusConfig = {
    url: `${HOST_NAME}/manga/${manga.slug}`,
    identifier: manga.id,
  };
  const { data: session, update } = useSession();
  const router = useRouter();
  const [userBookmark, setUserBookmark] = useState<
    undefined | { bookmarkId: string; isBookmark: boolean }
  >(undefined);
  const [notify, setNotify] = useState<{
    type: "warning" | "error" | "ok" | "";
    message: string;
  }>({ type: "", message: "" });

  const scrollToComment = () => {
    let comment = document.getElementById("commentContainer");
    window.scrollTo({
      top: comment?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const formatCount = () => {
    let countStr: any = manga.bookmarks.length;
    if (countStr > 1000) {
      countStr = `${Math.round(countStr / 1000)}K`;
    }
    if (countStr > 1000000) {
      countStr = `${Math.round(countStr / 1000000)}M`;
    }
    return countStr;
  };

  const bookmarkHandle = async () => {
    if (!session?.user) {
      setNotify({ type: "error", message: "Please login!" });
      return;
    }
    if (typeof userBookmark === "object" && userBookmark.isBookmark) {
      let user: any = session?.user;
      let bookmarkData: any = userBookmark;
      const { results, status, newAT } = await fetchApiWithToken(
        ["account/bookmark/deleteOne"],
        "delete",
        user.accessToken,
        user.refeshToken,
        { bookmarkId: bookmarkData.bookmarkId }
      );
      if (status === "unauthenticated" || !results) {
        signOut({ redirect: false });
      }
      if (newAT) {
        update({ newAT: newAT });
      }
      if (results) {
        let [data] = results;
        if (data.payload.id === userBookmark.bookmarkId) {
          setUserBookmark({ isBookmark: false, bookmarkId: "" });
        }
      }
    } else if (typeof userBookmark === "object" && !userBookmark.isBookmark) {
      let user: any = session?.user;
      const { results, status, newAT } = await fetchApiWithToken(
        ["account/bookmark/add"],
        "put",
        user.accessToken,
        user.refeshToken,
        { mangaId: manga.id }
      );
      if (status === "unauthenticated" || !results) {
        signOut({ redirect: false });
      }
      if (newAT) {
        update({ newAT: newAT });
      }
      if (results) {
        let [data] = results;
        setUserBookmark({ isBookmark: true, bookmarkId: data.payload.id });
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (session) {
        let user: any = session.user;
        const { results, status, newAT } = await fetchApiWithToken(
          ["account/bookmark/isBookmark"],
          "post",
          user.accessToken,
          user.refeshToken,
          { mangaId: manga.id }
        );
        if (status === "unauthenticated" || !results) {
          signOut({ redirect: false });
          setUserBookmark({ isBookmark: false, bookmarkId: "" });
        }
        if (newAT) {
          update({ newAT: newAT });
        }
        if (results) {
          let [data] = results;
          setUserBookmark({
            isBookmark: data.payload.isBookmark,
            bookmarkId: data.payload.bookmarkId,
          });
        }
      } else {
        setUserBookmark({ isBookmark: false, bookmarkId: "" });
      }
    })();
  }, [session, router]);

  return (
    <div className={styled.tab_summary_container}>
      <SiteNotify
        onClose={() => setNotify({ type: "", message: "" })}
        type={notify.type}
        message={notify.message}
      ></SiteNotify>
      <div className={`${styled.tab_summary} site_container`}>
        <h1 className=" text-xl text-mainColor pb-7">{manga.name}</h1>
        <div className="flex flex-col">
          <div className={styled.image_container}>
            <img src={manga.thumb_url} />
          </div>
          <div className={styled.content_container}>
            <div className="flex">
              <div className="w-full">
                <Rating ratings={manga.ratings} mangaId={manga.id}></Rating>
                <p className="my-2">
                  <span className="font-bold">Views: </span>
                  {manga.views ? manga.views : "_"}
                </p>
                <p className="my-2">
                  <span className="font-bold">Alternative: </span>
                  {manga.alternative}
                </p>
                <p className="my-2">
                  <span className="font-bold">Author: </span>
                  {manga.author}
                </p>
                <p className="my-2">
                  <span className="font-bold">Genres: </span>
                  {manga.categories.map((category: any, index: number) => (
                    <Link
                      key={index}
                      href={`/manga-genre/${category.slug}`}
                      className="hover:text-mainColor/80 duration-200"
                    >
                      {category.name}
                      {index != manga.categories.length - 1 && ",  "}
                    </Link>
                  ))}
                </p>
                <p className="my-2">
                  <span className="font-bold">Status: </span>
                  {manga.status ? "Done" : "OnGoing"}
                </p>
              </div>
              <div className="flex text-mainColor w-full justify-center">
                <div className="text-center p-5 text-3xl ">
                  <FontAwesomeIcon
                    icon={faCommentAlt}
                    className="hover:cursor-pointer hover:text-mainColor/80"
                    onClick={scrollToComment}
                  ></FontAwesomeIcon>
                  <p className="text-black text-sm mt-3">
                    <CommentCount
                      shortname={SHORT_NAME}
                      config={disqusConfig}
                    ></CommentCount>
                  </p>
                </div>
                {typeof userBookmark === "object" &&
                  userBookmark.isBookmark && (
                    <div className="text-center p-5 text-3xl">
                      <FontAwesomeIcon
                        title="unBookmark this manga"
                        className="hover:cursor-pointer hover:text-mainColor/80"
                        icon={faCheck}
                        onClick={bookmarkHandle}
                      ></FontAwesomeIcon>
                      <p className="text-black text-sm mt-3">
                        You bookmarked this
                      </p>
                    </div>
                  )}
                {userBookmark !== undefined &&
                  typeof userBookmark === "object" &&
                  !userBookmark.isBookmark && (
                    <div className="text-center p-5 text-3xl">
                      <FontAwesomeIcon
                        title="bookmark this manga"
                        className="hover:cursor-pointer hover:text-mainColor/80"
                        icon={faBookmark}
                        onClick={bookmarkHandle}
                      ></FontAwesomeIcon>
                      <p className="text-black text-sm mt-3">
                        {formatCount()} Users bookmarked This
                      </p>
                    </div>
                  )}
              </div>
            </div>
            {manga.chapters.length ? (
              <div className="flex flex-wrap">
                <Link
                  href={`/manga/${manga.slug}/${
                    [...manga.chapters].pop()?.slug
                  }`}
                  className="p-2 my-2 rounded mr-3 bg-mainColor text-white font-medium duration-200 hover:bg-black"
                >
                  Read first
                </Link>
                <Link
                  href={`/manga/${manga.slug}/${manga.chapters[0].slug}`}
                  className="p-2 my-2 rounded bg-mainColor text-white font-medium duration-200 hover:bg-black"
                >
                  Read last
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
