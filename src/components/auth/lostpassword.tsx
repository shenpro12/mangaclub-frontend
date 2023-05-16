import { useState } from "react";
import validator from "validator";
import styled from "./auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
export default function LostPassword({ active, togleLostPasswordHandle }: any) {
  const [status, setStatus] = useState<string>("");
  const [userNameOrEmai, setUserNameOrEmai] = useState<string>("");

  const getNewPasswordHandle = () => {};
  return (
    <div
      className={`${styled.wrap} ${active ? styled.active : ""}`}
      onClick={togleLostPasswordHandle}
    >
      <section
        className={styled.auth_container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className=" uppercase text-center font-bold text-2xl text-black/80">
          Lost your password?
        </header>
        <div
          className="absolute top-1 right-3 text-xl hover:cursor-pointer hover:text-black/70 duration-200"
          onClick={togleLostPasswordHandle}
        >
          <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
        </div>
        <div className={styled.auth_body}>
          <h1 className=" text-red-500 text-left py-3 font-medium">{status}</h1>
          <div>
            <label>UserName or Email*</label>
            <input onInput={(e: any) => setUserNameOrEmai(e.target.value)} />
          </div>
          <div className=" text-center mt-5">
            <p
              className="py-2 px-7 text-white font-bold bg-mainColor rounded-full inline-block hover:cursor-pointer hover:bg-black duration-300"
              onClick={getNewPasswordHandle}
            >
              Get New Password
            </p>
          </div>
          <div className="flex mt-5">
            <p
              className="mx-1 text-black/80 hover:text-mainColor font-medium hover:cursor-pointer"
              onClick={togleLostPasswordHandle}
            >
              Back to MangaClub
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
