import Navigate from "@/components/manager/navigate/navigate";
import "@/styles/globals.css";
import { faBookReader, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigateData = [
    { title: "Dashboard", icon: faChartSimple, redirect: "/manager" },
    { title: "Manga", icon: faBookReader, redirect: "/manager/manga" },
    { title: "Account", icon: faChartSimple, redirect: "/manager/account" },
  ];
  return (
    <React.Fragment>
      <Navigate navigateData={navigateData}></Navigate>
      <div className="flex-1 h-full bg-neutral-800 relative">{children}</div>
    </React.Fragment>
  );
}
