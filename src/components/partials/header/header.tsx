import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import Link from "next/link";
import styled from "./header.module.css";
import Search from "./search";
export default function Header() {
  const [togleSearhBar, setTogleSearhBar] = useState<Boolean>(false);
  const [togleHeader, setTogleHeader] = useState<Boolean>(false);
  const searchInput = useRef<any>();
  const togleSearchBarHandle = () => {
    searchInput.current?.focus();
    setTogleSearhBar(!togleSearhBar);
  };
  const togleHeaderHandle = () => {
    setTogleHeader(!togleHeader);
  };
  return (
    <div>
      <Search active={togleSearhBar} inputRef={searchInput}></Search>
      <div className={styled.header_container}>
        <div className={styled.header_navigation_container}>
          <div className={styled.main_navigation}>
            <div className={styled.header_logo}>
              <Link href="/post">
                <img src="/name_img.png" alt="logo" className="w-full h-full" />
              </Link>
            </div>
            <div className={styled.main_menu}>
              <div
                className={`${styled.header_overlay} ${
                  togleHeader ? styled.header_overlay_active : ""
                }`}
                onClick={togleHeaderHandle}
              ></div>
              <ul className={togleHeader ? styled.main_menu_active : ""}>
                <div className={styled.header_closeBtn}>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="mx-auto hover:cursor-pointer hover:text-black duration-300"
                    onClick={togleHeaderHandle}
                    size="2x"
                  ></FontAwesomeIcon>
                </div>
                <div className={styled.header_login_container}>
                  <a
                    href="/"
                    className="flex-1 text-center py-2 px-2 mx-1 border-2 border-white rounded-full text-xs hover:bg-black hover:border-black duration-300 "
                  >
                    Sign in
                  </a>
                  <a
                    href="/"
                    className="flex-1 text-center py-2 px-2 mx-1 border-2 border-white rounded-full text-xs hover:bg-black hover:border-black duration-300 "
                  >
                    Sign up
                  </a>
                </div>
                <li>
                  <a href="/">home</a>
                </li>
                <li>
                  <a href="/">latest manga</a>
                </li>
                <li>
                  <a href="/">hot manga</a>
                </li>
                <li>
                  <a href="/">new manga</a>
                </li>
              </ul>
            </div>
            <div className={styled.search_navigation__wrap}>
              <div
                className="w-10 h-10 flex justify-center items-center bg-white rounded-full text-mainColor hover:bg-black hover:text-white hover:cursor-pointer duration-200"
                onClick={togleSearchBarHandle}
              >
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </div>
              <div
                className={`${styled.search_navigation_btnSearch} hover: cursor-pointer`}
              >
                Search
              </div>
              <div className={styled.togle_menu} onClick={togleHeaderHandle}>
                <FontAwesomeIcon
                  icon={faBars}
                  size="2x"
                  className="hover:cursor-pointer hover:text-black duration-300"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
