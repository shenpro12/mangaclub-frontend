import Link from "next/link";
import { useSession } from "next-auth/react";
import styled from "./header.module.css";

export default function SubNav({ togleSignUpHandle, togleSignInHandle }: any) {
  const { data: session, status } = useSession();
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
        <p
          className="py-2 mr-1 text-sm font-medium text-black/80 block my-2 px-4 border-2 border-black/50 hover:bg-black hover:border-black hover:text-white duration-300 rounded-full"
          onClick={togleSignInHandle}
        >
          Sign in
        </p>
        <p
          className="py-2 text-sm font-medium text-black/80 block my-2 px-4 border-2 border-black/50 hover:bg-black hover:border-black hover:text-white duration-300 rounded-full"
          onClick={togleSignUpHandle}
        >
          Sign up
        </p>
      </div>
    </div>
  );
}
