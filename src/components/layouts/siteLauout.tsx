import { ReactElement } from "react";
import styled from "./siteLayout.module.css";
import Head from "next/head";
import { Manga } from "@/types/manga";
import SideBar from "../sideBar/sideBar";
export default function SiteLayout({
  children,
  title,
  header,
  sideBarData,
  sideBarHeader,
}: {
  children: ReactElement;
  title: string;
  header: string;
  sideBarData: Array<Manga>;
  sideBarHeader: string;
}) {
  return (
    <div
      className={`site_container flex  pb-14 pt-5 ${styled.siteLayout_container} `}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styled.children_container}>
        {header && <h1 className="font-medium text-lg py-3 ">{header}</h1>}
        {children}
      </div>
      <div className={styled.sideBar_container}>
        <SideBar manga={sideBarData} header={sideBarHeader}></SideBar>
      </div>
    </div>
  );
}
