"use client";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { Chapter, Image } from "@/types/types";
import styled from "./editchapter.module.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faClose,
  faDownload,
  faPenToSquare,
  faPlus,
  faSearchPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export type ImageState = Image & { newImageFile?: any; newThumb_url?: string };

export default function EditChapter({ chapter }: { chapter: Chapter }) {
  const [imageList, setImageList] = useState<Array<ImageState | undefined>>([
    ...chapter.images,
    undefined,
  ]);
  const [addItemIndex, setAddItemIndex] = useState<number>(
    chapter.images.length
  );
  const [zoomImage, setZoomImage] = useState<string | undefined>(undefined);

  const imageLength = useRef<number>(chapter.images.length);

  function onChange(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number
  ) {
    const nextState = swap(imageList, sourceIndex, targetIndex);
    setImageList(nextState);
    setAddItemIndex(targetIndex);
  }

  const deleteItemHandle = (id: string) => {
    setImageList([
      ...imageList.filter((i) => (i === undefined ? true : i.id !== id)),
    ]);
  };

  const changeImageHandle = (e: any, id: string) => {
    if (e.target.files[0]) {
      setImageList(
        [...imageList].map((i) => {
          if (i?.id === id) {
            return {
              ...i,
              newImageFile: e.target.files[0],
              newThumb_url: URL.createObjectURL(e.target.files[0]),
            };
          }
          return i;
        })
      );
    }
  };

  const resetImageHandle = (id: string) => {
    setImageList(
      [...imageList].map((i) => {
        if (i?.id === id) {
          return {
            ...i,
            newImageFile: undefined,
            newThumb_url: "",
          };
        }
        return i;
      })
    );
  };

  const downLoadImageHandle = async (url: string) => {
    const imageURL = URL.createObjectURL(await (await fetch(url)).blob());
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "";
    link.click();
  };

  const addImagehandle = (e: any) => {
    if (e.target.files.length) {
      let newImageList: Array<ImageState> = Object.values(e.target.files).map(
        (i: any, index: number) => ({
          newImageFile: i,
          newThumb_url: URL.createObjectURL(i),
          createdAt: "",
          updatedAt: "",
          deleteAt: null,
          id: `${imageLength.current + index + 1}`,
          thumb_url: "",
          order: 0,
        })
      );
      imageLength.current += newImageList.length;
      const temp = [...imageList];
      temp.splice(addItemIndex, 0, ...newImageList);
      setImageList(temp);
    }
  };

  useEffect(() => {
    //console.log(addItemIndex);
  });
  return (
    <div className={styled.wrap}>
      {zoomImage && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 z-50 text-white flex justify-center items-center">
          <div
            className="absolute top-5 right-5"
            onClick={() => setZoomImage(undefined)}
          >
            <FontAwesomeIcon
              icon={faClose}
              size="2x"
              className="hover:cursor-pointer hover:text-mainColor"
            ></FontAwesomeIcon>
          </div>
          <div className="w-2/4 h-5/6 overflow-scroll hover:cursor-grab">
            <img src={zoomImage} className=" object-contain" />
          </div>
        </div>
      )}
      <h1 className="font-semibold text-white text-2xl py-6">
        {chapter.title} - Information
      </h1>
      <section>
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id="items"
            boxesPerRow={5}
            rowHeight={250}
            style={{ height: `${250 * Math.ceil(imageList.length / 5)}px` }}
          >
            {imageList.map((item, index) =>
              item ? (
                <GridItem key={index} className="flex flex-col items-center">
                  <div
                    className="mb-3 w-36 h-48 rounded duration-150 hover:cursor-pointer [&>div]:hover:opacity-100"
                    style={{
                      backgroundImage: `url(${
                        item.newThumb_url || item.thumb_url
                      })`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="w-full h-full bg-black/70 duration-150 opacity-0 flex justify-center items-end p-3 text-white">
                      <input
                        type="file"
                        className="hidden"
                        id={`file${item.id}`}
                        onInput={(e) => changeImageHandle(e, item.id)}
                        accept="jpg, png, jpeg"
                        multiple={false}
                      />
                      <label
                        htmlFor={`file${item.id}`}
                        className="mx-2 hover:text-mainColor duration-150 hover:cursor-pointer"
                        title="Change Image"
                      >
                        <FontAwesomeIcon
                          className="w-5 h-5"
                          icon={faPenToSquare}
                        ></FontAwesomeIcon>
                      </label>
                      {item.newThumb_url && item.thumb_url && (
                        <div
                          className="mx-2 hover:text-mainColor duration-150"
                          title="Reset Change"
                          onClick={() => resetImageHandle(item.id)}
                        >
                          <FontAwesomeIcon
                            className="w-5 h-5"
                            icon={faArrowRotateLeft}
                          ></FontAwesomeIcon>
                        </div>
                      )}
                      {!item.newThumb_url && (
                        <div
                          className="mx-2 hover:text-mainColor duration-150"
                          title="Dowload Image"
                          onClick={() => downLoadImageHandle(item.thumb_url)}
                        >
                          <FontAwesomeIcon
                            className="w-5 h-5"
                            icon={faDownload}
                          ></FontAwesomeIcon>
                        </div>
                      )}
                      <div
                        className="mx-2 hover:text-mainColor duration-150"
                        title="Zoom Image"
                        onClick={() =>
                          setZoomImage(item.newThumb_url || item.thumb_url)
                        }
                      >
                        <FontAwesomeIcon
                          className="w-5 h-5"
                          icon={faSearchPlus}
                        ></FontAwesomeIcon>
                      </div>
                      <div
                        className="mx-2 hover:text-red-500 duration-150"
                        title="Delete Image"
                        onClick={() => deleteItemHandle(item.id)}
                      >
                        <FontAwesomeIcon
                          className="w-5 h-5"
                          icon={faTrashAlt}
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  </div>
                  <h1>
                    Order:{" "}
                    <span className="text-white">
                      {item.order ? item.order : "_"}
                    </span>
                  </h1>
                </GridItem>
              ) : (
                <GridItem
                  key={index}
                  className="flex flex-col items-center"
                  title="Add more image start from this position"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="files_input"
                    accept="jpg, png, jpeg"
                    multiple
                    onInput={(e) => addImagehandle(e)}
                  />
                  <label
                    htmlFor="files_input"
                    className="mb-3 w-36 h-48 rounded duration-150 hover:cursor-pointer border border-white/20 flex justify-center items-center hover:text-white"
                  >
                    <FontAwesomeIcon icon={faPlus} size="2x"></FontAwesomeIcon>
                  </label>
                  <h1>Add new image</h1>
                </GridItem>
              )
            )}
          </GridDropZone>
        </GridContextProvider>
      </section>
    </div>
  );
}
