import { useState } from "react";
import validator from "validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";
import request from "@/util/request";
import styled from "./auth.module.css";
import Loading from "../loading/loading";
export default function SignUp({
  active,
  togleSignUpHandle,
  togleSignInHandle,
  togleLostPasswordHandle,
}: any) {
  const [status, setStatus] = useState<string>("Register for this site");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSignUp, setHasSignUp] = useState<boolean>(false);

  const signUpHandle = async () => {
    if (!validator.isLength(userName, { min: 6 })) {
      setStatus("Username must have at least 6 characters.");
      return;
    }
    if (!validator.isEmail(email)) {
      setStatus("Invalid email address. Please check again.");
      return;
    }
    if (!validator.isLength(password, { min: 8 })) {
      setStatus("Password must have at least 8 characters.");
      return;
    }
    setLoading(true);
    let res: any = await request.post("account/signup", {
      userName,
      password,
      email,
    });
    setLoading(false);
    setStatus(res.message);
    if (res.status) {
      setHasSignUp(true);
    }
  };
  return (
    <div
      className={`${styled.wrap} ${active ? styled.active : ""}`}
      onClick={togleSignUpHandle}
    >
      <section
        className={styled.auth_container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {loading && <Loading></Loading>}
        <header className=" uppercase text-center font-bold text-2xl text-black/80">
          sign Up
        </header>
        <div
          className="absolute top-1 right-3 text-xl hover:cursor-pointer hover:text-black/70 duration-200"
          onClick={togleSignUpHandle}
        >
          <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
        </div>
        <h1 className=" text-red-500 text-center py-3 font-medium">{status}</h1>
        {hasSignUp ? (
          ""
        ) : (
          <div className={styled.auth_body}>
            <div>
              <label>UserName*</label>
              <input onInput={(e: any) => setUserName(e.target.value)} />
            </div>
            <div>
              <label>Email Address*</label>
              <input onInput={(e: any) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Password*</label>
              <input onInput={(e: any) => setPassword(e.target.value)} />
            </div>
            <div className=" text-center mt-5">
              <p
                className="py-2 px-7 text-white font-bold bg-mainColor rounded-full inline-block hover:cursor-pointer hover:bg-black duration-300"
                onClick={signUpHandle}
              >
                Register
              </p>
            </div>
            <div className="flex mt-5">
              <p
                className="mx-1 text-black/80 hover:text-mainColor font-medium hover:cursor-pointer"
                onClick={togleSignInHandle}
              >
                Login
              </p>
              {"|"}
              <p
                className="mx-1 text-black/80 hover:text-mainColor font-medium hover:cursor-pointer"
                onClick={togleLostPasswordHandle}
              >
                Lost your password?
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
