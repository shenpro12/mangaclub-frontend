import { useRef, useState } from "react";
import styled from "./header.module.css";
import { useRouter } from "next/router";
export default function Search({ active, inputRef }: any) {
  const router = useRouter();
  const [searchString, setSearchString] = useState<string>("");
  const container = useRef<any>();
  const inputHandle = (e: any) => {
    setSearchString(e.target.value);
  };
  const searchHandle = () => {
    if (searchString) {
      container.current.classList.remove(styled.active);
      router.push(`/search/?keyword=${searchString}`);
    }
  };
  return (
    <div
      ref={container}
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
        <p
          className="text-white px-6 py-3 bg-mainColor font-semibold hover:cursor-pointer hover:bg-black duration-200"
          onClick={searchHandle}
        >
          Search
        </p>
      </div>
    </div>
  );
}
