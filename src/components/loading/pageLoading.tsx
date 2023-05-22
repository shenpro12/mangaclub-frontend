import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageLoading() {
  return (
    <div
      className="flex justify-center items-center px-5 py-10"
      style={{ height: "55vh" }}
    >
      <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
    </div>
  );
}
