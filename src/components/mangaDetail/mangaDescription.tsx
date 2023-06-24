import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "./mangaDetail.module.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
export default function MangaDescription({
  description,
}: {
  description: string;
}) {
  const router = useRouter();
  let descriptionContainer = useRef<any>();
  let descriptionContent = useRef<any>();
  const [collap, setCollap] = useState<boolean>(false);
  const [collapBtn, setCollapBtn] = useState<boolean>(true);

  const toggleDescriptionHandle = () => {
    if (
      !collap &&
      descriptionContainer.current.clientHeight <
        descriptionContent.current.clientHeight
    ) {
      descriptionContainer.current.style.height = `${descriptionContent.current.clientHeight}px`;
    } else {
      descriptionContainer.current.style.height = "119px";
    }
    setCollap(!collap);
  };

  useEffect(() => {
    setCollap(false);
    descriptionContainer.current.style.height = "119px";
    if (descriptionContent.current.clientHeight < 119) {
      descriptionContainer.current.style.height = "min-content";
      setCollapBtn(false);
    } else {
      setCollapBtn(true);
    }
  }, [router]);

  return (
    <div className="mb-7">
      <div className="flex items-center uppercase border-b-2 border-black/10 mb-7 mt-2">
        <div className=" w-8 h-8 bg-mainColor text-white text-lg mr-5 flex justify-center items-center relative">
          <FontAwesomeIcon icon={faStar} className="z-10"></FontAwesomeIcon>
          <div className="absolute bg-mainColor rotate-45 -right-1 w-3 h-3"></div>
        </div>
        <h2 className=" text-lg font-semibold">Summary</h2>
      </div>
      <div ref={descriptionContainer} className={styled.desciption_container}>
        <p ref={descriptionContent} className={styled.description}>
          {description}
        </p>
        {!collap && collapBtn && (
          <div
            className={`absolute bottom-0 w-full h-14 ${styled.overlay}`}
          ></div>
        )}
      </div>
      {collapBtn && (
        <div className="flex items-center text-black/60 text-sm mt-1 justify-center hover:text-mainColor duration-150">
          <h1
            className="font-semibold hover:cursor-pointer inline-block mr-2"
            onClick={toggleDescriptionHandle}
          >
            {collap ? "Show less" : "Show more"}
          </h1>
        </div>
      )}
    </div>
  );
}
