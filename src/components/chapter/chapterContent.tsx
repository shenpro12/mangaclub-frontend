import { Image } from "@/types/types";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import styled from "./chapter.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function ChapterContent({
  imageList,
  viewStyle,
}: {
  imageList: Array<Image>;
  viewStyle: "paged" | "list";
}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [router]);
  return imageList.length ? (
    <div className="my-16">
      {viewStyle === "list" &&
        imageList
          .sort(function (a, b) {
            return a.order - b.order;
          })
          .map((image, index) => (
            <div key={image.id} className={styled.container}>
              {index <= 10 ? (
                <img
                  src={image.thumb_url}
                  className={styled.image}
                  alt={`image-${index}`}
                />
              ) : (
                <img
                  data-src={image.thumb_url}
                  className={`${styled.image} lazyload`}
                  alt={`image-${index}`}
                />
              )}
            </div>
          ))}
      {viewStyle === "paged" && (
        <>
          <div className={`${styled.container} relative`}>
            <div className="absolute h-full w-full flex">
              <div
                className={styled.prev_img_btn}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1 > 0 ? currentPage - 1 : imageList.length
                  )
                }
              ></div>
              <div
                className={styled.next_img_btn}
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1 <= imageList.length ? currentPage + 1 : 1
                  )
                }
              ></div>
            </div>
            <img
              src={`${imageList[currentPage - 1].thumb_url}`}
              className={styled.image}
              alt={`${imageList[currentPage - 1].id}`}
            />
          </div>

          <section className="flex justify-center items-center mt-10">
            <h3 className="py-1 px-2 rounded font-semibold bg-zinc-200 mr-5 text-xl">
              <span>{currentPage}</span>/<span>{imageList.length}</span>
            </h3>
            <div className="flex ml-2">
              <div
                className="px-2 mx-1 hover:cursor-pointer hover:text-mainColor duration-150 rounded"
                onClick={() => setCurrentPage(1)}
              >
                <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
              </div>
              <div
                className="px-2 mx-2 hover:cursor-pointer hover:text-mainColor duration-150 rounded"
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1 > 0 ? currentPage - 1 : imageList.length
                  )
                }
              >
                <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
              </div>
              <div
                className="px-2 mx-2 hover:cursor-pointer hover:text-mainColor duration-150 rounded"
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1 <= imageList.length ? currentPage + 1 : 1
                  )
                }
              >
                <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
              </div>
              <div
                className="px-2 mx-2 hover:cursor-pointer hover:text-mainColor duration-150 rounded"
                onClick={() => setCurrentPage(imageList.length)}
              >
                <FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  ) : (
    <div></div>
  );
}
