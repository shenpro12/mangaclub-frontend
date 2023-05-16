import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/partials/footer/footer";
import Header from "@/components/partials/header/header";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </SessionProvider>
  );
}
