import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center py-10 px-5">
      <img src="/404.png" width={500} />
      <h1 className="py-10 font-bold text-2xl">Oops! page not found.</h1>
      <Link
        href="/"
        className="text-xl font-medium text-black/70 py-2 px-5 border-2 border-black/50 rounded-full hover:bg-black hover:border-black duration-200 hover:text-white"
      >
        Go Home
      </Link>
    </div>
  );
}
