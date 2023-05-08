import Footer from "@/components/partials/footer/footer";
import Header from "@/components/partials/header/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </div>
  );
}
