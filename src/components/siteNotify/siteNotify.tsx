import {
  faCircleCheck,
  faCircleXmark,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "./siteNotify.module.css";

export default function SiteNotify({
  type,
  message,
  onClose,
}: {
  type: "warning" | "error" | "ok" | "";
  message: string;
  onClose: any;
}) {
  const [color, setColor] = useState<string>();
  const [icon, setIcon] = useState<any>();
  useEffect(() => {
    if (type === "warning") {
      setColor("border-yellow-500 text-yellow-500 shadow-yellow-500");
      setIcon(faTriangleExclamation);
    } else if (type === "error") {
      setColor("border-red-500 text-red-500 shadow-red-500");
      setIcon(faCircleXmark);
    } else {
      setColor("border-lime-500 text-lime-500 shadow-lime-500");
      setIcon(faCircleCheck);
    }
  }, [type]);
  useEffect(() => {
    const ticker = setTimeout(() => {
      onClose();
      clearTimeout(ticker);
    }, 5000);
    return () => {
      clearTimeout(ticker);
    };
  }, [type]);
  return (
    <div
      className={`flex items-center z-50 duration-700 rounded-tr rounded-br shadow-md text-lg fixed p-3 bottom-7 left-2 bg-white border-r-8 hover:cursor-pointer ${color} ${
        !type && !message && styled.hide
      }`}
      onClick={onClose}
    >
      <h1 className="mr-3 font-medium">{message}</h1>
      {icon && (
        <FontAwesomeIcon icon={icon} className="text-xl"></FontAwesomeIcon>
      )}
    </div>
  );
}
