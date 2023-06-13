import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect } from "react";
import styled from "./footer.module.css";
import debounce from "@/util/debounce";
export default function Footer() {
  const moveTopbtn = useRef<any>();
  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const backToTopHandle = debounce(() => {
      if (window.scrollY > 300) {
        moveTopbtn.current.classList.add(styled.active);
      } else {
        moveTopbtn.current.classList.remove(styled.active);
      }
    });
    document.addEventListener("scroll", backToTopHandle);
    return () => {
      document.removeEventListener("scroll", backToTopHandle);
    };
  }, []);
  return (
    <div className={styled.footer_container}>
      <div className="flex justify-center text-sm mb-3">
        <div className="px-5">
          <Link className=" hover:text-mainColor duration-200" href="/">
            Home
          </Link>
        </div>
        <div className="px-5 border-l-2 border-r-2 border-black">
          <Link className=" hover:text-mainColor duration-200" href="/">
            Privacy Policy
          </Link>
        </div>
        <div className="px-5">
          <Link className=" hover:text-mainColor duration-200" href="/">
            Contact Us
          </Link>
        </div>
      </div>
      <div>
        <h1 className="text-xs text-black/80">@ 2023 Manga Club by LEVANDAT</h1>
      </div>
      <div
        ref={moveTopbtn}
        className="hidden fixed justify-center items-center rounded-full w-9 h-9 bg-zinc-400 text-white/60 hover:bg-mainColor hover:cursor-pointer hover:text-white duration-200 right-5 bottom-5"
        onClick={moveToTop}
      >
        <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
      </div>
    </div>
  );
}
