import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PageLoading from "../loading/pageLoading";
import { useEffect, useState } from "react";
import fetchApiWithToken from "@/util/fetchApiWithToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import Account from "./account";
import Bookmark from "./bookmark";
import styled from "./profile.module.css";

export default function Profile() {
  const router = useRouter();
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [profile, setProfile] = useState<any>();
  const [isFetch, setIsFetch] = useState<boolean>(false);

  const changeBookmarkHandle = (bookmarks: any) => {
    setProfile({ ...profile, bookmarks: bookmarks });
  };

  useEffect(() => {
    (async () => {
      if (session && !isFetch) {
        let temp: any = { ...session };
        const { results, status, newAT } = await fetchApiWithToken(
          ["account/profile"],
          "get",
          temp.user.accessToken,
          temp.user.refeshToken
        );

        if (status === "unauthenticated" || !results) {
          signOut({ callbackUrl: "/" });
        }
        if (newAT) {
          update({ newAT: newAT });
        }
        if (results) {
          const [userProfile] = results;
          setProfile(userProfile.payload);
        }
        setIsFetch(true);
      }
    })();
  }, [session]);

  if (status === "loading" || !profile) {
    return <PageLoading></PageLoading>;
  }

  return (
    <div>
      <div className="flex items-center uppercase border-b-2 border-black/10 mb-7 mt-2">
        <div className=" w-8 h-8 bg-mainColor text-white text-lg mr-5 flex justify-center items-center relative">
          <FontAwesomeIcon icon={faStar} className="z-10"></FontAwesomeIcon>
          <div className="absolute bg-mainColor rotate-45 -right-1 w-3 h-3"></div>
        </div>
        <h2 className=" text-xl font-bold">User Settings</h2>
      </div>

      <div className={styled.container}>
        <div className={styled.tab}>
          <div
            className={`${
              router.query.tab === "bookmark-settings"
                ? "bg-mainColor text-white"
                : "bg-zinc-200 text-black/70 hover:cursor-pointer hover:text-mainColor"
            } flex  items-center  font-bold p-3 text-lg r duration-150 `}
            onClick={() =>
              router.push("/user-settings?tab=bookmark-settings", undefined, {
                shallow: true,
              })
            }
          >
            <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
            <p className="ml-4">Bookmarks</p>
          </div>
          <div
            className={`${
              router.query.tab === "account-settings"
                ? "bg-mainColor text-white"
                : "bg-zinc-200 text-black/70 hover:cursor-pointer hover:text-mainColor"
            } flex  items-center  font-bold p-3 text-lg  duration-150 `}
            onClick={() =>
              router.push("/user-settings?tab=account-settings", undefined, {
                shallow: true,
              })
            }
          >
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            <p className="ml-4">Account-Settings</p>
          </div>
        </div>
        <div className={styled.content}>
          {router.query.tab === "account-settings" ? (
            <Account profile={profile}></Account>
          ) : router.query.tab === "bookmark-settings" ? (
            <Bookmark
              bookmarks={profile.bookmarks}
              session={session}
              updateSession={update}
              onChangeBookmark={changeBookmarkHandle}
            ></Bookmark>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
