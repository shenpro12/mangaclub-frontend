"use client";

import { signOut, useSession } from "next-auth/react";
import styled from "./navigate.module.css";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/modal/modal";
import { useEffect, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ApiResponse, Manga } from "@/types/types";
import request from "@/util/request";

export default function Navigate({
  type,
  navigateData,
}: {
  navigateData: Array<{
    title: string;
    icon: IconDefinition;
    redirect: string;
  }>;
  type?: "sub";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const [togleModal, setTogleModal] = useState<boolean>(false);
  const [mangaData, setMangaData] = useState<Manga | undefined>(undefined);

  const logOutHandle = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    if (type === "sub") {
      (async () => {
        const res: ApiResponse = await request.get(
          `manga/id/${params?.mangaId}`
        );
        const manga: Manga = res.payload;
        if (!manga) {
          router.push("/manager");
          return;
        }
        setMangaData(manga);
      })();
    }
  }, []);
  if (!mangaData && type === "sub") {
    return (
      <h1 className="w-64 h-full bg-neutral-800 border-r border-white/10 text-white/70 flex flex-col">
        loading..
      </h1>
    );
  }
  return (
    <div className="w-64 h-full bg-neutral-800 border-r border-white/10 text-white/70 flex flex-col">
      {togleModal && (
        <Modal
          header="Thông báo"
          message="Bạn có chắc muốn đăng xuất?"
          yesNo={true}
          onClose={() => setTogleModal(false)}
          onAccept={logOutHandle}
        ></Modal>
      )}
      {type === "sub" && (
        <div
          className="flex items-center justify-start py-3 px-5 mb-2 text-white hover:cursor-pointer hover:bg-neutral-900 duration-150"
          onClick={() => router.push("/manager/manga")}
        >
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="w-10 h-5"
          ></FontAwesomeIcon>
          <h1 className="font-semibold ml-3">Go back</h1>
        </div>
      )}
      {type === "sub" && mangaData ? (
        <div className="text-center pb-6 px-6 text-sm">
          <img src={mangaData.thumb_url} className="mx-auto mb-3 w-3/4" />
          <h1 className="font-semibold text-white">{mangaData.name}</h1>
        </div>
      ) : (
        <div className="text-center p-6 text-sm">
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
            <img src={`${session?.user.image}`} />
          </div>
          <h3 className="mt-5 mb-2 text-base font-semibold text-white">
            Manager Your Website
          </h3>
          <p>{session?.user.name ? session?.user.name : "_"}</p>
        </div>
      )}
      <ul className={styled.navBar}>
        <div>
          {navigateData.map((i, index) => (
            <Link key={index} href={i.redirect}>
              <li className={pathname === i.redirect ? styled.active : ""}>
                <FontAwesomeIcon
                  className="w-5 h-5"
                  icon={i.icon}
                ></FontAwesomeIcon>
                <h1 className="ml-2">{i.title}</h1>
              </li>
            </Link>
          ))}
        </div>
        <li
          className="hover:text-red-500 absolute bottom-0 w-full"
          onClick={() => setTogleModal(true)}
        >
          <FontAwesomeIcon
            className="w-5 h-5"
            icon={faPowerOff}
          ></FontAwesomeIcon>
          <h1 className="ml-2">Logout</h1>
        </li>
      </ul>
    </div>
  );
}
