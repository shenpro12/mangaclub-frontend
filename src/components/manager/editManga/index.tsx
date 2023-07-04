"use client";
import { Genres, Manga } from "@/types/types";
import styled from "./editManga.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/modal/modal";

export default function EditManga({
  manga,
  genres,
}: {
  manga: Manga;
  genres: Array<Genres>;
}) {
  const [togleModal, setTogleModal] = useState<boolean>(false);
  const [mangaName, setMangaName] = useState<string>(manga.name);
  const [description, setDescription] = useState<string>(manga.description);
  const [alternative, setAlternative] = useState<string>(manga.alternative);
  const [author, setAuthor] = useState<string>(manga.author);
  const [poster, setPoster] = useState<string>(manga.thumb_url);
  const [posterFile, setPosterFile] = useState<any>(undefined);
  const [mangaGenres, setMangaGenres] = useState<Array<Genres>>(
    manga.categories
  );
  const [availableGenres, setavailableGenres] = useState<Array<Genres>>(genres);

  const onChangeAvatar = (e: any) => {
    if (e.target.files[0]) {
      setPoster(URL.createObjectURL(e.target.files[0]));
      setPosterFile(e.target.files[0]);
    }
  };

  const searchGenreHandle = (searchString: string) => {
    if (searchString) {
      setavailableGenres(
        genres.filter((i) =>
          i.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
        )
      );
    } else {
      setavailableGenres(genres);
    }
  };

  const changeMangaGenreHandle = (genre: Genres, e?: any) => {
    if (e && e.target.checked) {
      setMangaGenres([...mangaGenres, genre]);
      return;
    }
    setMangaGenres(mangaGenres.filter((i) => i.id !== genre.id));
  };

  const resetInformationHandle = () => {
    setMangaName(manga.name);
    setDescription(manga.description);
    setAlternative(manga.alternative);
    setAuthor(manga.author);
    setPoster(manga.thumb_url);
    setPosterFile(undefined);
    setMangaGenres(manga.categories);
    let element = document.getElementsByClassName(styled.wrap);
    element[0]?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const updateMagaHandle = async () => {
    setTogleModal(false);
  };

  return (
    <div className={styled.wrap}>
      {togleModal && (
        <Modal
          header="Message"
          message="Are you sure to update this Manga?"
          yesNo={true}
          onClose={() => setTogleModal(false)}
          onAccept={updateMagaHandle}
        ></Modal>
      )}
      <h1 className="font-semibold text-white text-2xl py-6">
        Manga Information
      </h1>
      <section className="px-3 py-2 border border-white/10 rounded focus-within:border-mainColor duration-150">
        <section className="flex flex-col-reverse">
          <textarea
            value={mangaName}
            className=" bg-transparent outline-none w-full py-2 text-white [&+p]:focus:text-mainColor"
            onChange={(e: any) => setMangaName(e.target.value)}
            maxLength={100}
            required={true}
            placeholder="Add name for this Manga"
          ></textarea>
          <p className="text-sm duration-150">
            Manga name {"("}require{")"}
          </p>
        </section>
        <p className="text-sm text-right">{mangaName.length}/100</p>
      </section>
      <section className="flex">
        <section className="px-3 py-2 mt-5 border border-white/10 rounded w-max h-max">
          <p className="text-sm">
            Poster {"("}require{")"}
          </p>
          <div className="py-5 flex">
            <div className="mr-5 w-32 h-48 overflow-hidden">
              <img src={poster} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-lg mb-3">Only for .jpg .png file</h3>
              <input
                type="file"
                name="avatar_input"
                className="hidden"
                id="image_input"
                accept=".jpg, .png"
                onChange={onChangeAvatar}
              />
              <div>
                <label
                  htmlFor="image_input"
                  className=" text-sm py-2 px-2 rounded-sm border bg-neutral-900 text-white border-white/20 duration-150 hover:cursor-pointer hover:bg-black hover:text-white "
                >
                  Choose file
                </label>
              </div>
            </div>
          </div>
        </section>
        <section className="flex-1">
          <section className="px-3 py-2 mt-5 border border-white/10 rounded flex-1 ml-5 h-max duration-150 focus-within:border-mainColor">
            <section className="flex flex-col-reverse">
              <textarea
                value={author}
                className=" bg-transparent outline-none w-full py-2 text-white [&+p]:focus:text-mainColor"
                onChange={(e: any) => setAuthor(e.target.value)}
                maxLength={100}
                required={true}
                placeholder="Add alternative for this Manga"
              ></textarea>
              <p className="text-sm duration-150">Author</p>
            </section>
            <p className="text-sm text-right">{author.length}/100</p>
          </section>
          <section className="px-3 py-2 mt-5 ml-5 border border-white/10 rounded duration-150 focus-within:border-mainColor">
            <section className="flex flex-col-reverse">
              <textarea
                value={alternative}
                className="h-max bg-transparent outline-none w-full py-2 text-white [&+p]:focus:text-mainColor"
                onChange={(e: any) => setAlternative(e.target.value)}
                maxLength={500}
                required={true}
                placeholder="Add alternative for this Manga"
              ></textarea>
              <p className="text-sm duration-150">Alternative</p>
            </section>
            <p className="text-sm text-right">{alternative.length}/500</p>
          </section>
        </section>
      </section>
      <section className="px-3 py-2 mt-5 border border-white/10 rounded duration-150 focus-within:border-mainColor">
        <section className="flex flex-col-reverse">
          <textarea
            value={description}
            className=" bg-transparent outline-none w-full py-2 text-white [&+p]:focus:text-mainColor"
            onChange={(e: any) => setDescription(e.target.value)}
            maxLength={5000}
            required={true}
            placeholder="Add description for this Manga"
          ></textarea>
          <p className="text-sm duration-150">Description</p>
        </section>
        <p className="text-sm text-right">{description.length}/5000</p>
      </section>
      <section className="px-3 py-2 mt-5 border border-white/10 rounded">
        <p className="text-sm">
          Genres {"("}require{")"}
        </p>
        <section className="flex py-3">
          <section className="w-1/4 h-72 border border-white/10 rounded p-3 flex flex-col">
            <p className="text-sm mb-3">Available genres</p>
            <section className="flex items-center mb-3 text-sm">
              <p>Find: </p>
              <input
                className=" bg-transparent outline-none flex-1 ml-3"
                placeholder="Genre name"
                onChange={(e: any) => searchGenreHandle(e.target.value)}
              />
            </section>
            <ul className={`flex-1 overflow-y-scroll ${styled.scrollStyle}`}>
              {!availableGenres.length ? (
                <p className="text-center text-xs">Not found!</p>
              ) : (
                availableGenres.map((i) => (
                  <li key={i.id} className="flex items-center">
                    <input
                      id={`available_genre_${i.id}`}
                      type="checkbox"
                      className="mr-2 hover:cursor-pointer"
                      checked={
                        mangaGenres.find((j) => j.id === i.id) ? true : false
                      }
                      onChange={(e: any) => changeMangaGenreHandle(i, e)}
                    />
                    <label
                      htmlFor={`available_genre_${i.id}`}
                      className="hover:cursor-pointer hover:text-white duration-150"
                    >
                      {i.name}
                    </label>
                  </li>
                ))
              )}
            </ul>
          </section>
          <section className="ml-5 w-3/4 border border-white/10 rounded p-3">
            <section className="flex justify-between">
              <p className="text-sm">Manga genres</p>
              <p
                className="text-sm hover:cursor-pointer hover:text-red-500 duration-100"
                onClick={() => setMangaGenres([])}
              >
                Clear all
              </p>
            </section>
            <ul>
              {!mangaGenres.length ? (
                <p className="text-center text-xs mt-10">
                  Please select genre for this Manga!
                </p>
              ) : (
                mangaGenres.map((i) => (
                  <li
                    key={i.id}
                    className="mr-3 mt-3 rounded-l-full rounded-r-full py-2 px-4 bg-white/20 text-white inline-block text-sm"
                  >
                    <p className="flex">
                      {i.name}
                      <span
                        className="pl-3 flex items-center hover:cursor-pointer hover:text-white text-white/60"
                        onClick={() => changeMangaGenreHandle(i)}
                      >
                        <FontAwesomeIcon
                          icon={faClose}
                          className="w-4 h-4"
                        ></FontAwesomeIcon>
                      </span>
                    </p>
                  </li>
                ))
              )}
            </ul>
          </section>
        </section>
      </section>
      <section className="py-2 mt-5 text-right">
        <button
          className="py-2 px-4 mx-2 rounded text-white text-sm font-semibold duration-150 uppercase bg-red-500/80 hover:bg-red-500"
          onClick={resetInformationHandle}
        >
          RESET
        </button>
        <button
          className="py-2 px-4 mx-2 rounded text-white text-sm font-semibold duration-150 uppercase bg-mainColor/80 hover:bg-mainColor"
          onClick={() => setTogleModal(true)}
        >
          UPDATE
        </button>
      </section>
    </div>
  );
}
