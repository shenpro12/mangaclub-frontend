import { Image } from "@/types/types";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import styled from "./chapter.module.css";

export default function ChapterContent({
  imageList,
}: {
  imageList: Array<Image>;
}) {
  return (
    <div className=" my-16">
      {imageList
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
    </div>
  );
}
