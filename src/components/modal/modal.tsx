import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal({
  header,
  message,
  yesNo,
  onAccept,
  onClose,
}: any) {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black/40 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded w-96 h-max relative py-2 px-4 mx-3"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="absolute top-1 right-2 hover:cursor-pointer text-black"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
        </div>
        <h1 className=" text-center font-bold text-lg text-black normal-case">
          {header}
        </h1>
        <p className="my-5 text-black normal-case font-normal">{message}</p>
        {yesNo ? (
          <div className="flex justify-end text-white font-medium">
            <p
              className="py-2 px-4 bg-mainColor rounded mx-1 text-sm hover:cursor-pointer duration-200 hover:bg-black normal-case"
              onClick={onAccept}
            >
              Yes
            </p>

            <p
              className="py-2 px-4 bg-red-600 rounded mx-1 text-sm hover:cursor-pointer duration-200 hover:bg-red-500 normal-case"
              onClick={onClose}
            >
              Cancel
            </p>
          </div>
        ) : (
          <div className="flex justify-end text-white font-medium">
            <p
              className="py-2 px-4 bg-mainColor rounded mx-1 text-sm hover:cursor-pointer duration-200 hover:bg-black normal-case"
              onClick={onClose}
            >
              Biết rồi
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
