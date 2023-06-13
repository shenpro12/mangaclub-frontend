import { SearchContext } from "@/pages/search";
import { ChangeSortCallback } from ".";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export default function PagingFillter({
  onChoose,
  totalItem,
  currSort,
}: {
  onChoose: ChangeSortCallback;
  totalItem: number;
  currSort: string | string[] | undefined;
}) {
  const searchKeyword = useContext(SearchContext);
  return (
    <div className="my-2 border-b border-black/20 py-2">
      <div className="flex items-center text-lg uppercase font-bold">
        <div className=" w-8 h-8 bg-mainColor text-white text-lg mr-5 flex justify-center items-center relative">
          <FontAwesomeIcon icon={faStar} className="z-10"></FontAwesomeIcon>
          <div className="absolute bg-mainColor rotate-45 -right-1 w-3 h-3"></div>
        </div>
        <div>
          <h1>
            {totalItem} results {searchKeyword && `for "${searchKeyword}"`}
          </h1>
        </div>
      </div>
      <div className="flex-1 flex justify-end">
        <ul className="flex flex-wrap text-black/70">
          <li className="pr-2 py-1 mx-1">
            <h1 className="font-medium text-black">Sort by</h1>
          </li>
          <li
            className={`px-2 py-1 mx-1 hover:text-mainColor hover:cursor-pointer duration-150 ${
              currSort == "latest" && "text-mainColor"
            }`}
            onClick={() => onChoose("latest")}
          >
            <h1>Latest</h1>
          </li>
          <li
            className={`px-2 py-1 mx-1 hover:text-mainColor hover:cursor-pointer duration-150 ${
              currSort == "alphabet" && "text-mainColor"
            }`}
            onClick={() => onChoose("alphabet")}
          >
            <h1>A-Z</h1>
          </li>
          <li
            className={`px-2 py-1 mx-1 hover:text-mainColor hover:cursor-pointer duration-150 ${
              currSort == "rating" && "text-mainColor"
            }`}
            onClick={() => onChoose("rating")}
          >
            <h1>Rating</h1>
          </li>
          <li
            className={`pl-2 py-1 mx-1 hover:text-mainColor hover:cursor-pointer duration-150 ${
              currSort == "views" && "text-mainColor"
            }`}
            onClick={() => onChoose("views")}
          >
            <h1>Most Views</h1>
          </li>
        </ul>
      </div>
    </div>
  );
}
