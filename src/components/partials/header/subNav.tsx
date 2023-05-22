import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styled from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/modal/modal";
import { useState } from "react";

export default function SubNav({ togleSignUpHandle, togleSignInHandle }: any) {
  const { data: session, status } = useSession();
  const [togleModal, setTogleModal] = useState<boolean>(false);
  const signOutHandle = () => {
    signOut({ redirect: false });
    setTogleModal(false);
  };
  return (
    <div
      className={`site_container flex justify-between ${styled.sub_container}`}
    >
      <ul className="uppercase flex flex-wrap py-2 my-auto flex-1">
        <li>
          <Link
            href="/"
            className="font-bold text-black/60 text-sm hover:text-mainColor duration-300"
          >
            manhua
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="font-bold text-black/60 text-sm hover:text-mainColor duration-300"
          >
            manhwa
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="font-bold text-black/60 text-sm hover:text-mainColor duration-300"
          >
            yaoi
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="font-bold text-black/60 text-sm hover:text-mainColor duration-300"
          >
            bookmarks
          </Link>
        </li>
      </ul>

      <div className={styled.sub_login_container}>
        {status === "loading" ? (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
          </div>
        ) : session?.user ? (
          <>
            {togleModal && (
              <Modal
                header="Thông báo"
                message="Bạn có chắc muốn đăng xuất?"
                yesNo={true}
                onClose={() => setTogleModal(false)}
                onAccept={signOutHandle}
              ></Modal>
            )}
            <div
              className={`flex items-center text-black/80 relative hover:cursor-pointer py-3 ${styled.user_container}`}
            >
              <h1 className="text-black mr-2">Hi, {session.user.name}</h1>
              <img
                src={session.user.image || ""}
                className="h-8 w-8 rounded-full"
                id="user_avatar"
              />

              <ul className={styled.user_option_tablet}>
                <li>
                  <Link href="/">My Bookmarks</Link>
                </li>
                <li>
                  <Link href="/">Settings</Link>
                </li>
                <li>
                  <p onClick={() => setTogleModal(true)}>Logout</p>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex">
            <p
              className="py-2 hover:cursor-pointer mr-1 text-sm font-medium text-black/80 block my-2 px-4 border-2 border-black/50 hover:bg-black hover:border-black hover:text-white duration-300 rounded-full"
              onClick={togleSignInHandle}
            >
              Sign in
            </p>
            <p
              className="py-2 hover:cursor-pointer text-sm font-medium text-black/80 block my-2 px-4 border-2 border-black/50 hover:bg-black hover:border-black hover:text-white duration-300 rounded-full"
              onClick={togleSignUpHandle}
            >
              Sign up
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
