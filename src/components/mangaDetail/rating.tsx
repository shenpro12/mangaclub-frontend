import { faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import SiteNotify from "../siteNotify/siteNotify";
import fetchApiWithToken from "@/util/fetchApiWithToken";

export default function Rating({
  ratings,
  mangaId,
}: {
  ratings: Array<any>;
  mangaId: string;
}) {
  const { data: session, status, update } = useSession();
  const h1 = useRef<any>();
  const [ratingData, setratingData] = useState(
    ratings.length
      ? ratings.reduce((total, curr: any) => total + curr.point, 0) /
          ratings.length
      : 0
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [notify, setNotify] = useState<{
    type: "warning" | "error" | "ok" | "";
    message: string;
  }>({ type: "", message: "" });
  const highLightStartHandle = (position: number, message: boolean) => {
    if (message) {
      h1.current.innerHTML = "Your rating";
    }
    for (let i = 1; i <= 5; i++) {
      let element = document.getElementById(`${i}`);
      element?.classList.remove("text-yellow-400");
      element?.classList.add("text-zinc-400");
    }
    for (let i = 1; i <= position; i++) {
      let element = document.getElementById(`${i}`);
      element?.classList.add("text-yellow-400");
      element?.classList.remove("text-zinc-400");
    }
  };

  const resetHighLightStart = () => {
    highLightStartHandle(ratingData, false);
    h1.current.innerHTML = "";
  };
  const sendRatingHandle = async (startPoint: number) => {
    if (!session) {
      setNotify({ type: "error", message: "Please login!" });
      return;
    }
    setLoading(true);
    let user: any = session?.user;
    const { results, status, newAT } = await fetchApiWithToken(
      ["account/manga/rating"],
      "put",
      user.accessToken,
      user.refeshToken,
      { mangaId, point: startPoint }
    );
    if (status === "unauthenticated" || !results) {
      signOut({ redirect: false });
    }
    if (newAT) {
      update({ newAT: newAT });
    }
    if (results) {
      setNotify({
        type: "ok",
        message: "Voted success! Your voted will update soon!",
      });
    } else {
      setNotify({
        type: "error",
        message: "Something wrong! Please try again!",
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    highLightStartHandle(ratingData, false);
  }, []);

  return (
    <div className="flex items-center">
      <SiteNotify
        onClose={() => setNotify({ type: "", message: "" })}
        type={notify.type}
        message={notify.message}
      ></SiteNotify>
      <div className="flex relative">
        {loading && (
          <div className="bg-white/20 absolute flex justify-center items-center w-full h-full">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-black/50"
              spin
            ></FontAwesomeIcon>
          </div>
        )}
        <div
          id="1"
          className="text-zinc-400 mr-1 text-2xl hover:cursor-pointer"
          onMouseOut={() => resetHighLightStart()}
          onMouseOver={() => highLightStartHandle(1, true)}
          onClick={() => sendRatingHandle(1)}
        >
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
        <div
          id="2"
          className="text-zinc-400 mr-1 text-2xl hover:cursor-pointer"
          onMouseOut={() => resetHighLightStart()}
          onMouseOver={() => highLightStartHandle(2, true)}
          onClick={() => sendRatingHandle(2)}
        >
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
        <div
          id="3"
          className="text-zinc-400 mr-1 text-2xl hover:cursor-pointer"
          onMouseOut={() => resetHighLightStart()}
          onMouseOver={() => highLightStartHandle(3, true)}
          onClick={() => sendRatingHandle(3)}
        >
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
        <div
          id="4"
          className="text-zinc-400 mr-1 text-2xl hover:cursor-pointer"
          onMouseOut={() => resetHighLightStart()}
          onMouseOver={() => highLightStartHandle(4, true)}
          onClick={() => sendRatingHandle(4)}
        >
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
        <div
          id="5"
          className="text-zinc-400 mr-1 text-2xl hover:cursor-pointer"
          onMouseOut={() => resetHighLightStart()}
          onMouseOver={() => highLightStartHandle(5, true)}
          onClick={() => sendRatingHandle(5)}
        >
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
      </div>
      <h1 className="text-black/60 ml-3 font-bold text-xs" ref={h1}></h1>
    </div>
  );
}
