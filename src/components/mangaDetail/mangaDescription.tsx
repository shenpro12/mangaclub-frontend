import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "./mangaDetail.module.css";
import {
  faStar,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
export default function MangaDescription({
  description,
}: {
  description: string;
}) {
  let descriptionContainer = useRef<any>();
  let descriptionContent = useRef<any>();
  const [collap, setCollap] = useState<boolean>(false);
  const [collapBtn, setCollapBtn] = useState<boolean>(true);
  useEffect(() => {
    if (
      collap &&
      descriptionContainer.current.clientHeight <
        descriptionContent.current.clientHeight
    ) {
      descriptionContainer.current.style.height = `${
        descriptionContent.current.clientHeight + 32
      }px`;
    } else {
      descriptionContainer.current.style.height = "119px";
    }
  });

  useEffect(() => {
    if (
      descriptionContainer.current.clientHeight >
      descriptionContent.current.clientHeight
    ) {
      setCollapBtn(false);
    }
  }, []);
  return (
    <div>
      <div className="flex uppercase border-b border-black/10 mb-7 mt-2">
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
        <div
          className={`absolute bottom-0 w-full h-8 ${styled.description_overlay}`}
        ></div>
      </div>
      {collapBtn && (
        <div className="flex items-center justify-center hover:text-mainColor duration-150">
          <h1
            className="font-semibold text-lg hover:cursor-pointer inline-block mr-2"
            onClick={() => setCollap(!collap)}
          >
            {collap ? "Show less" : "Show more"}
          </h1>
          <FontAwesomeIcon
            icon={collap ? faCaretUp : faCaretDown}
          ></FontAwesomeIcon>
        </div>
      )}
    </div>
  );
}
