import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SiteNotify from "../siteNotify/siteNotify";

export default function Rating({ ratings }: any) {
  const { data: session, status } = useSession();
  const [ratingData, setratingData] = useState(ratings && ratings.length);
  const [notify, setNotify] = useState<{
    type: "warning" | "error" | "ok" | "";
    message: string;
  }>({ type: "", message: "" });
  const highLightStartHandle = (position: number) => {
    for (let i = 1; i <= 5; i++) {
      let element = document.getElementById(`${i}`);
      element?.classList.remove("text-yellow-400");
    }
    for (let i = 1; i <= position; i++) {
      let element = document.getElementById(`${i}`);
      element?.classList.add("text-yellow-400");
    }
  };

  const resetHighLightStart = () => {
    highLightStartHandle(ratingData);
  };
  const sendRatingHandle = (startPoint: number) => {
    if (!session) {
      setNotify({ type: "error", message: "Please login!" });
      return;
    }
  };
  return (
    <div>
      <SiteNotify
        onClose={() => setNotify({ type: "", message: "" })}
        type={notify.type}
        message={notify.message}
      ></SiteNotify>
      <div className="flex">
        <div
          id="1"
          className="text-zinc-400 mr-1 text-2xl hover:cursor-pointer"
          onMouseOut={() => resetHighLightStart()}
          onMouseOver={() => highLightStartHandle(1)}
          onClick={() => sendRatingHandle(1)}
        >
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
        <div
          id="2"
          className="text-zinc-400 mr-1 text-2xl hover:cursor-pointer"
          onMouseOut={() => resetHighLightStart()}
          onMouseOver={() => highLightStartHandle(2)}
          onClick={() => sendRatingHandle(2)}
        >
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
        <div
          id="3"
          className="text-zinc-400 mr-1 text-2xl hover:cursor-pointer"
          onMouseOut={() => resetHighLightStart()}
          onMouseOver={() => highLightStartHandle(3)}
          onClick={() => sendRatingHandle(3)}
        >
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
        <div
          id="4"
          className="text-zinc-400 mr-1 text-2xl hover:cursor-pointer"
          onMouseOut={() => resetHighLightStart()}
          onMouseOver={() => highLightStartHandle(4)}
          onClick={() => sendRatingHandle(4)}
        >
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
        <div
          id="5"
          className="text-zinc-400 mr-1 text-2xl hover:cursor-pointer"
          onMouseOut={() => resetHighLightStart()}
          onMouseOver={() => highLightStartHandle(5)}
          onClick={() => sendRatingHandle(5)}
        >
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </div>
      </div>
      <div></div>
    </div>
  );
}
