import { useState } from "react";
import validator from "validator";
import styled from "./auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
export default function SignIn({
  active,
  togleSignInHandle,
  togleSignUpHandle,
  togleLostPasswordHandle,
}: any) {
  const [status, setStatus] = useState<string>("");
  const [userNameOrEmail, setUserNameOrEmai] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const signInHandle = async () => {
    if (validator.isEmpty(userNameOrEmail) || validator.isEmpty(password)) {
      setStatus("Please enter full information");
      return;
    }
    setLoading(true);
    let signinInfo = await signIn("credentials", {
      userNameOrEmail: userNameOrEmail,
      password: password,
      redirect: false,
    });
    setLoading(false);
    if (signinInfo?.ok) {
      togleSignInHandle();
    } else {
      setStatus("Wrong username or password.");
    }
  };
  return (
    <div
      className={`${styled.wrap} ${active ? styled.active : ""}`}
      onClick={togleSignInHandle}
    >
      <section
        className={styled.auth_container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {loading && (
          <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10 text-white flex justify-center items-center text-2xl">
            <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
          </div>
        )}
        <header className=" uppercase text-center font-bold text-2xl text-black/80">
          sign In
        </header>
        <div
          className="absolute top-1 right-3 text-xl hover:cursor-pointer hover:text-black/70 duration-200"
          onClick={togleSignInHandle}
        >
          <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
        </div>
        <div className={styled.auth_body}>
          <h1 className=" text-red-500 text-left py-3 font-medium">{status}</h1>
          <div>
            <label>UserName or Email*</label>
            <input onInput={(e: any) => setUserNameOrEmai(e.target.value)} />
          </div>
          <div>
            <label>Password*</label>
            <input onInput={(e: any) => setPassword(e.target.value)} />
          </div>
          <div className=" text-center mt-5">
            <p
              className="py-2 px-7 text-white font-bold bg-mainColor rounded-full inline-block hover:cursor-pointer hover:bg-black duration-300"
              onClick={signInHandle}
            >
              Login
            </p>
          </div>
          <div className="flex mt-5">
            <p
              className="mx-1 text-black/80 hover:text-mainColor font-medium hover:cursor-pointer"
              onClick={togleSignUpHandle}
            >
              SignUp
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
      </section>
    </div>
  );
}
