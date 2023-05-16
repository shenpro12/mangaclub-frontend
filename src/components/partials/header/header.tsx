import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import Link from "next/link";
import styled from "./header.module.css";
import Search from "./search";
import SubNav from "./subNav";
import SignUp from "@/components/auth/signup";
import SignIn from "@/components/auth/signin";
import LostPassword from "@/components/auth/lostpassword";
export default function Header() {
  const [togleSearhBar, setTogleSearhBar] = useState<Boolean>(false);
  const [togleHeader, setTogleHeader] = useState<Boolean>(false);
  const [togleSignUp, setTogleSignUp] = useState<Boolean>(false);
  const [togleSignIn, setTogleSignIn] = useState<Boolean>(false);
  const [togleLostPassword, setTogleLostPassword] = useState<Boolean>(false);
  const searchInput = useRef<any>();
  const togleSearchBarHandle = () => {
    searchInput.current?.focus();
    setTogleSearhBar(!togleSearhBar);
  };
  const togleHeaderHandle = () => {
    setTogleHeader(!togleHeader);
  };
  const togleSignUpHandle = () => {
    setTogleSignUp(!togleSignUp);
    setTogleSignIn(togleSignUp && false);
    setTogleLostPassword(togleSignUp && false);
  };
  const togleSignInHandle = () => {
    setTogleSignIn(!togleSignIn);
    setTogleSignUp(togleSignIn && false);
    setTogleLostPassword(togleSignUp && false);
  };
  const togleLostPasswordHandle = () => {
    setTogleLostPassword(!togleLostPassword);
    setTogleSignIn(togleLostPassword && false);
    setTogleSignUp(togleLostPassword && false);
  };
  return (
    <div>
      <LostPassword
        active={togleLostPassword}
        togleLostPasswordHandle={togleLostPasswordHandle}
      ></LostPassword>
      <SignUp
        active={togleSignUp}
        togleSignUpHandle={togleSignUpHandle}
        togleSignInHandle={togleSignInHandle}
        togleLostPasswordHandle={togleLostPasswordHandle}
      ></SignUp>
      <SignIn
        active={togleSignIn}
        togleSignInHandle={togleSignInHandle}
        togleSignUpHandle={togleSignUpHandle}
        togleLostPasswordHandle={togleLostPasswordHandle}
      ></SignIn>
      <Search active={togleSearhBar} inputRef={searchInput}></Search>
      <div className={styled.header_container}>
        <div className={`${styled.header_navigation_container} site_container`}>
          <div className={styled.main_navigation}>
            <div className={styled.header_logo}>
              <Link href="/">
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
                  <p
                    className="flex-1 text-center py-2 px-2 mx-1 border-2 border-white rounded-full text-xs hover:bg-black hover:border-black duration-300 "
                    onClick={togleSignInHandle}
                  >
                    Sign in
                  </p>
                  <p
                    className="flex-1 text-center py-2 px-2 mx-1 border-2 border-white rounded-full text-xs hover:bg-black hover:border-black duration-300 "
                    onClick={togleSignUpHandle}
                  >
                    Sign up
                  </p>
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
      <SubNav
        togleSignInHandle={togleSignInHandle}
        togleSignUpHandle={togleSignUpHandle}
      ></SubNav>
    </div>
  );
}
