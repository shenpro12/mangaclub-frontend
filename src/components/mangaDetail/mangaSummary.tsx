import { Manga } from "@/types/manga";
import styled from "./mangaDetail.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import Rating from "./rating";
export default function MangaSummry({ manga }: { manga: Manga }) {
  return (
    <div className={styled.tab_summary_container}>
      <div className={`${styled.tab_summary} site_container`}>
        <h1 className=" text-xl text-mainColor pb-7">{manga.name}</h1>
        <div className="flex flex-col">
          <div className={styled.image_container}>
            <img src={manga.thumb_url} />
          </div>
          <div className={styled.content_container}>
            <div className="flex">
              <div className="w-full">
                <Rating rating={manga.ratings}></Rating>
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
                <div className="text-center p-5 text-3xl">
                  <FontAwesomeIcon icon={faCommentAlt}></FontAwesomeIcon>
                  <p className="text-black text-sm mt-3">{} Comments</p>
                </div>
                <div className="text-center p-5 text-3xl">
                  <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
                  <p className="text-black text-sm mt-3">
                    {} Users bookmarked This
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Link
                href="/"
                className="p-2 rounded mr-3 bg-mainColor text-white font-medium duration-200 hover:bg-black"
              >
                Read first
              </Link>
              <Link
                href="/"
                className="p-2 rounded bg-mainColor text-white font-medium duration-200 hover:bg-black"
              >
                Read last
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
