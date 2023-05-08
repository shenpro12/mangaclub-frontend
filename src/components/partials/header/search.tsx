import { MouseEvent, useState } from "react";
import styled from "./header.module.css";
export default function Search({ active, inputRef }: any) {
  const [searchString, setSearchString] = useState<string>("");
  const inputHandle = (e: any) => {
    setSearchString(e.target.value);
  };
  return (
    <div
      className={`${styled.search_bar_container} ${
        active ? styled.active : ""
      }`}
    >
      <div className={styled.search_bar}>
        <input
          ref={inputRef}
          id="searchBtn"
          placeholder="Search..."
          type="text"
          className="flex-1 border border-black/20 outline-none px-5 bg-black/10 hover:bg-white duration-200"
          onInput={inputHandle}
        />
        <a
          href={`/search/?s=${searchString}`}
          className="text-white px-6 py-3 bg-mainColor font-semibold hover:cursor-pointer hover:bg-black duration-200"
        >
          Search
        </a>
      </div>
    </div>
  );
}
