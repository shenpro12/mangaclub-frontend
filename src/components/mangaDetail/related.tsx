import { Manga } from "@/types/types";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import Link from "next/link";

export default function Related({
  relatedManga,
}: {
  relatedManga: Array<Manga>;
}) {
  return (
    <div className="mt-7">
      <div className="flex items-center uppercase border-b-2 border-black/10 mb-7 mt-2">
        <div className=" w-8 h-8 bg-mainColor text-white text-lg mr-5 flex justify-center items-center relative">
          <FontAwesomeIcon icon={faStar} className="z-10"></FontAwesomeIcon>
          <div className="absolute bg-mainColor rotate-45 -right-1 w-3 h-3"></div>
        </div>
        <h2 className=" text-lg font-semibold mr-7">YOU MAY ALSO LIKE</h2>
      </div>
      <div>
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            "600": {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            "992": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            "1170": {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          modules={[Autoplay]}
        >
          {relatedManga.map((manga: Manga) => (
            <SwiperSlide key={manga.id}>
              <Link href={`/manga/${manga.slug}`}>
                <div className="w-32 h-40 mx-auto [&>div]:hover:bottom-0 overflow-hidden rounded-br-2xl rounded-bl-2xl relative">
                  <img src={manga.thumb_url} className="object-cover" />
                  <div className="absolute -bottom-6 w-full bg-mainColor py-2 px-3 duration-200">
                    <p className="text-white text-sm font-semibold truncate">
                      {manga.name}
                    </p>
                    <p className="text-sm text-white mt-1 truncate">
                      {manga.author}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
