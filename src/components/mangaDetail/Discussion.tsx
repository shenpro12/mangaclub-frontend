import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DiscussionEmbed } from "disqus-react";
import { HOST_NAME, SHORT_NAME } from "@/constant";
export default function Discussion({
  id,
  slug,
  header,
  middleUrl,
}: {
  id: string;
  slug: string;
  header: string;
  middleUrl: string;
}) {
  const disqusConfig = {
    url: `${HOST_NAME}/${middleUrl}/${slug}`,
    identifier: id,
  };
  return (
    <div className=" mt-7" id="commentContainer">
      <div className="flex items-center uppercase border-b-2 border-black/10 mb-7 mt-2">
        <div className=" w-8 h-8 bg-mainColor text-white text-lg mr-5 flex justify-center items-center relative">
          <FontAwesomeIcon icon={faStar} className="z-10"></FontAwesomeIcon>
          <div className="absolute bg-mainColor rotate-45 -right-1 w-3 h-3"></div>
        </div>
        <h2 className=" text-lg font-semibold mr-7">{header}</h2>
      </div>
      <DiscussionEmbed
        shortname={SHORT_NAME}
        config={disqusConfig}
      ></DiscussionEmbed>
    </div>
  );
}
