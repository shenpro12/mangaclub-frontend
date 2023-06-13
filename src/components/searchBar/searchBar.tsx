import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "./searchBar.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import getUrlQuery from "@/util/getUrlQuery";
export default function SearchBar({ genres }: { genres: Array<any> }) {
  const router = useRouter();
  const [query, setQuery] = useState<any>(() => {
    let temp = router.query;
    if (typeof temp.author === "object") {
      temp.author = temp.author[0];
    }
    if (typeof temp.status === "object") {
      temp.status = temp.status[0];
    }
    if (typeof temp.keyword === "object") {
      temp.keyword = temp.keyword[0];
    }
    return temp;
  });
  const advancedContainer = useRef<any>();
  const advancedContent = useRef<any>();
  const [collap, setCollap] = useState<boolean>(true);

  const toggleAdvancedhandle = () => {
    setCollap(!collap);
  };

  const changeGenreHandle = (e: any) => {
    if (query.genre) {
      if (typeof query.genre === "string") {
        setQuery({
          ...query,
          genre: e.target.checked
            ? [query.genre, e.target.value]
            : e.target.value === query.genre
            ? ""
            : query.genre,
        });
      }
      if (typeof query.genre === "object") {
        setQuery({
          ...query,
          genre: e.target.checked
            ? [...query.genre, e.target.value]
            : query.genre.filter((i: any) =>
                i === e.target.value ? false : true
              ),
        });
      }
    } else {
      setQuery({ ...query, genre: e.target.checked ? e.target.value : "" });
    }
  };

  const changeAuthorHandle = (e: any) => {
    setQuery({ ...query, author: e.target.value });
  };

  const changeKeywordHandle = (e: any) => {
    setQuery({ ...query, keyword: e.target.value });
  };

  const changeStatusHandle = (e: any) => {
    setQuery({ ...query, status: e.target.checked ? e.target.value : "" });
  };

  const searchHandle = () => {
    setCollap(true);
    const queryParams: string = getUrlQuery(query);
    router.push(`/search${queryParams ? queryParams : ""}`, undefined, {
      shallow: true,
    });
  };

  const searchWithKeyWordOnlyHandle = () => {
    setCollap(true);
    const queryParams: string = getUrlQuery({ keyword: query.keyword });
    router.push(`/search${queryParams ? queryParams : ""}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (collap) {
      advancedContainer.current.style.height = "0px";
    } else {
      advancedContainer.current.style.height = `${advancedContent.current.clientHeight}px`;
    }
  }, [collap]);

  useEffect(() => {
    const queryParams: string = getUrlQuery(query);
    router.push(`/search${queryParams ? queryParams : ""}`, undefined, {
      shallow: true,
    });
  }, []);

  useEffect(() => {
    setQuery(router.query);
  }, [router]);

  return (
    <div className={styled.container}>
      <section
        className={`site_container fixingContainerPadingX flex justify-between flex-wrap ${styled.wrap}`}
      >
        <div className={styled.search_input_container}>
          <input
            value={query.keyword ? query.keyword : ""}
            className={styled.search_input}
            placeholder="Search..."
            onChange={changeKeywordHandle}
          />
          <button
            className="bg-mainColor px-5 rounded-tr rounded-br text-white hover:bg-black duration-150"
            onClick={searchWithKeyWordOnlyHandle}
          >
            <FontAwesomeIcon icon={faSearch} className=""></FontAwesomeIcon>
          </button>
        </div>
        <div className={styled.advanced_btn_container}>
          <button
            className={styled.advanced_btn}
            onClick={toggleAdvancedhandle}
          >
            Advanced
          </button>
        </div>
      </section>
      <section
        ref={advancedContainer}
        className="h-0 overflow-hidden duration-500"
      >
        <section
          ref={advancedContent}
          className="site_container fixingContainerPadingX "
        >
          <section className="flex flex-wrap mb-7 pt-7">
            {genres.map((genre) => (
              <div
                key={genre.id}
                className="flex pr-2 py-2 mr-5 min-w-max font-semibold text-lg text-black hover:text-mainColor duration-150"
              >
                <input
                  type="checkbox"
                  id={`genreCheckbox_${genre.id}`}
                  value={genre.name.toLowerCase()}
                  checked={
                    query.genre?.includes(genre.name.toLowerCase())
                      ? true
                      : false
                  }
                  className="hover:cursor-pointer"
                  onChange={changeGenreHandle}
                />
                <label
                  htmlFor={`genreCheckbox_${genre.id}`}
                  className="ml-3 hover:cursor-pointer"
                >
                  {genre.name}
                </label>
              </div>
            ))}
          </section>
          <section className="mb-7 flex items-center font-semibold text-lg text-black">
            <h3 className="mr-5">Author</h3>
            <input
              type="text"
              placeholder="Author"
              value={query.author ? query.author : ""}
              className="outline-none rounded border border-black/20 font-normal px-3 py-1"
              onChange={changeAuthorHandle}
            />
          </section>
          <section className="mb-7 flex items-center font-semibold text-lg text-black">
            <h3 className="mr-5">Status</h3>
            <div className="flex items-center ml-3">
              <input
                className="mr-2 hover:cursor-pointer"
                id="ongoing"
                type="checkbox"
                checked={query.status === "ongoing" ? true : false}
                value={"ongoing"}
                onChange={changeStatusHandle}
              />
              <label
                className="hover:cursor-pointer hover:text-mainColor duration-150"
                htmlFor="ongoing"
              >
                OnGoing
              </label>
            </div>
            <div className="flex items-center ml-5">
              <input
                className="mr-2 hover:cursor-pointer"
                id="completed"
                type="checkbox"
                checked={query.status === "completed" ? true : false}
                value={"completed"}
                onChange={changeStatusHandle}
              />
              <label
                className="hover:cursor-pointer hover:text-mainColor duration-150"
                htmlFor="completed"
              >
                Completed
              </label>
            </div>
          </section>
          <section className="w-full text-center">
            <button
              className="px-5 py-2 bg-mainColor text-white font-semibold text-lg rounded duration-150 hover:bg-black"
              onClick={searchHandle}
            >
              Search
            </button>
          </section>
        </section>
      </section>
    </div>
  );
}
