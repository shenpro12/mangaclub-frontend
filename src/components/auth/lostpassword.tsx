import { useState } from "react";
import validator from "validator";
import styled from "./auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";
import request from "@/util/request";
import { ApiResponse } from "@/types/types";
export default function LostPassword({ active, togleLostPasswordHandle }: any) {
  const [status, setStatus] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getNewPasswordHandle = async () => {
    if (validator.isEmpty(email)) {
      setStatus("Please enter information");
      return;
    }
    if (!validator.isEmail(email)) {
      setStatus("Email is not accept! Please try again!");
      return;
    }
    setLoading(true);
    try {
      let res: ApiResponse = await request.put("account/newPassword", {
        email,
      });
      setStatus(res.message);
    } catch (err) {
      setStatus("Something wrong! Please try again!");
    }

    setLoading(false);
  };

  return (
    <div
      className={`${styled.wrap} ${active ? styled.active : ""}`}
      onClick={togleLostPasswordHandle}
    >
      {loading && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10 text-white flex justify-center items-center text-2xl">
          <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
        </div>
      )}
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
            <label>Your Email*</label>
            <input onInput={(e: any) => setEmail(e.target.value)} />
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
