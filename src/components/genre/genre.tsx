import Link from "next/link";
import styled from "./genre.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
export default function GenreList({ genreList }: { genreList: Array<any> }) {
  const [collap, setCollap] = useState<boolean>(false);
  const genreContainer = useRef<any>();
  const genreContent = useRef<any>();
  const expandFillterList = () => {
    setCollap(!collap);
  };
  useEffect(() => {
    if (collap) {
      genreContainer.current.style.height = `${genreContent.current.clientHeight}px`;
    } else {
      genreContainer.current.style.height = "0px";
    }
  });
  return (
    <div className={styled.container}>
      <div
        className={`${styled.genre_wrap} site_container fixingContainerPadingX`}
      >
        <section className="sm:h-12 flex items-center mb-4">
          <div className=" text-black/70 text-sm">
            <Link className="hover:text-mainColor duration-150" href="/">
              Home
            </Link>{" "}
            /{" "}
            <Link className="hover:text-mainColor duration-150" href="/">
              All Mangas
            </Link>
          </div>
        </section>
        <section>
          <header className="flex justify-between">
            <h1 className="uppercase text-white font-medium text-sm flex items-center bg-mainColor px-5 py-1">
              genres
            </h1>
            <div
              className="flex justify-center items-center pb-3 pt-2 px-2 text-mainColor bg-transparent border-2 border-mainColor duration-150 hover:text-white hover:bg-black hover:border-black hover:cursor-pointer"
              onClick={expandFillterList}
            >
              <FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon>
            </div>
          </header>
          <section
            ref={genreContainer}
            className="duration-500 overflow-hidden h-0"
          >
            <section ref={genreContent} className="py-3 flex flex-wrap">
              {genreList.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/manga-genre/${genre.slug}`}
                  className="px-2 py-1 m-2 flex-1 min-w-max font-semibold text-lg text-black hover:text-mainColor duration-150"
                >
                  <p>
                    <span>{genre.name}</span>
                    <span className="text-xs ml-1">{`(${genre.manga})`}</span>
                  </p>
                </Link>
              ))}
            </section>
          </section>
        </section>
      </div>
    </div>
  );
}
