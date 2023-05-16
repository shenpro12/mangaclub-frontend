import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/50 z-10 text-white flex justify-center items-center text-2xl">
      <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
    </div>
  );
}
