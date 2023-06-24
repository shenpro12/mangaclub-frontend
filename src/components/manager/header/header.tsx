"use client";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "./header.module.css";
import { useRef, useState } from "react";
import { Manga } from "@/types/types";
import request from "@/util/request";
import axios from "axios";
export default function Header() {
  const [toggleSearchResult, setToggleSearchResult] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const [result, setResult] = useState<Array<Manga>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const input = useRef<any>();
  const timer = useRef<any>();
  const controller = useRef<AbortController>();
  const searchMangaHandle = (e: any) => {
    setResult([]);
    if (e.target.value) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      controller.current?.abort();
      controller.current = new AbortController();
      timer.current = setTimeout(async () => {
        try {
          setLoading(true);
          let res: any = await request.get(
            `search?keyword=${e.target.value}&paging=none`,
            { signal: controller.current?.signal }
          );
          setLoading(false);
          setResult(res.payload.mangaList);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            console.log(error);
          }
        }
      }, 500);
    } else {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      controller.current?.abort();
      controller.current = new AbortController();
    }
    setSearchString(e.target.value);
  };
  return (
    <div className={styled.wrap}>
      <div className="h-full">
        <img src="/name_img.png" className="w-48 h-full" />
      </div>
      <div className="flex-1 flex items-center h-full">
        <div className={styled.search_container}>
          <div className="relative">
            <div
              className={`text-white/50 py-2 px-4 rounded border border-white/10 flex items-center relative bg-neutral-800 ${
                toggleSearchResult && "z-30"
              }`}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="w-4 h-4 mr-3"
              ></FontAwesomeIcon>
              <input
                ref={input}
                className={styled.search_input}
                value={searchString}
                placeholder="Find manga"
                onFocus={() => setToggleSearchResult(true)}
                onChange={searchMangaHandle}
              />
              {searchString && (
                <div
                  onClick={(e: any) => {
                    setSearchString("");
                    setLoading(false);
                    input.current.focus();
                    if (timer.current) {
                      clearTimeout(timer.current);
                    }
                    controller.current?.abort();
                    controller.current = new AbortController();
                    setResult([]);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faClose}
                    className="w-3 h-3 ml-3 hover:cursor-pointer"
                  ></FontAwesomeIcon>
                </div>
              )}
            </div>
            <ul
              className={`${styled.search_result} ${
                toggleSearchResult && `${styled.active} z-30`
              }`}
            >
              {loading && <div className={styled.loader_line}></div>}
              <li>
                <h3>Result {result.length ? `(${result.length})` : ""}</h3>
              </li>
              {result.map((i) => (
                <li
                  key={i.id}
                  className="flex items-center hover:bg-neutral-900 hover:cursor-pointer"
                >
                  <div className="w-12 h-16 overflow-hidden mr-3">
                    <img src={i.thumb_url} className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3>{i.name}</h3>
                  </div>
                </li>
              ))}
            </ul>
            <div
              className={`${styled.search_overlay}  ${
                toggleSearchResult && styled.active
              }`}
              onClick={() => setToggleSearchResult(false)}
            ></div>
          </div>
        </div>
        <div className="w-48 text-right">
          <button className="bg-neutral-800 text-white text-sm py-2 px-3 rounded font-semibold border border-white/10">
            New Manga
          </button>
        </div>
      </div>
    </div>
  );
}
