import Header from "@/components/manager/header/header";
import NextauthSessionProvider from "@/components/manager/sessionProvider/sessionProvider";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NextauthSessionProvider>
          <div className="flex flex-col h-screen w-screen">
            <Header></Header>
            <div className="flex-1 flex">{children}</div>
          </div>
        </NextauthSessionProvider>
      </body>
    </html>
  );
}
