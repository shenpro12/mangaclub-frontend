import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PagingControl({
  onChoosePage,
  currPage,
  maxPage,
  pages,
}: {
  onChoosePage: any;
  currPage: number;
  maxPage: number;
  pages: Array<number>;
}) {
  if (maxPage === 1) {
    return <div></div>;
  }

  return (
    <ul className="flex flex-wrap justify-center items-center mt-5 text-black/40">
      {maxPage !== 0 && (
        <li className="rounded-sm px-2 py-1">
          <p
            className=" px-2 py-1 font-bold bg-zinc-200/70"
            onClick={() => onChoosePage(currPage - 1)}
          >
            Page {currPage} of {maxPage}
          </p>
        </li>
      )}
      {currPage > 1 && (
        <>
          <li className="hover:cursor-pointer mx-1">
            <p
              className="hover:text-white hover:bg-mainColor font-bold  px-2 py-1 rounded-sm duration-150"
              onClick={() => onChoosePage(1)}
            >
              First
            </p>
          </li>
          <li className="hover:cursor-pointer hover:text-white hover:bg-mainColor rounded-sm duration-150 px-2 py-1">
            <p className="text-sm" onClick={() => onChoosePage(currPage - 1)}>
              <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
            </p>
          </li>
        </>
      )}
      {pages.map(
        (i) =>
          i > 0 && (
            <li className="hover:cursor-pointer mx-1" key={i}>
              <p
                className={`${
                  i === currPage
                    ? "text-black bg-zinc-200/70"
                    : "hover:text-white hover:bg-mainColor"
                } font-bold  px-2 py-1 rounded-sm duration-150`}
                onClick={() => onChoosePage(i)}
              >
                {i}
              </p>
            </li>
          )
      )}
      {currPage < maxPage && (
        <>
          <li className="hover:cursor-pointer hover:text-white hover:bg-mainColor rounded-sm duration-150 px-2 py-1">
            <p className="text-sm" onClick={() => onChoosePage(currPage + 1)}>
              <FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon>
            </p>
          </li>
          <li className="hover:cursor-pointer mx-1">
            <p
              className="hover:text-white hover:bg-mainColor font-bold  px-2 py-1 rounded-sm duration-150"
              onClick={() => onChoosePage(maxPage)}
            >
              Last
            </p>
          </li>
        </>
      )}
    </ul>
  );
}
