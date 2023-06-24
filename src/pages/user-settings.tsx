import SiteLayout from "@/components/layouts/siteLauout";
import Profile from "@/components/profile";
import request from "@/util/request";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserSettingsPage() {
  const router = useRouter();
  const [sideBarData, setSideBarData] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      let res: any = await request.get("manga?paging=none&sort=views");
      setSideBarData(res.payload.mangaList.slice(0, 9));
    })();
  }, []);

  return (
    <SiteLayout
      title={`${
        router.query.tab === "account-settings"
          ? "My Profile - "
          : router.query.tab === "bookmark-settings"
          ? "My Bookmarks - "
          : ""
      }Mangaclub`}
      header=""
      sideBarData={sideBarData}
      sideBarHeader="Most view"
    >
      <Profile></Profile>
    </SiteLayout>
  );
}
