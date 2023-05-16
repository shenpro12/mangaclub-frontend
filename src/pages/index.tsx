import { useSession } from "next-auth/react";
import Head from "next/head";

export default function HomePage() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="site_container bg-red-400">
      <Head>
        <title>Mangaclub - Read Manga Online</title>
      </Head>
      <div className=" h-96"></div>
      <div className=" h-96"></div>
      <div className=" h-96"></div>
    </div>
  );
}
