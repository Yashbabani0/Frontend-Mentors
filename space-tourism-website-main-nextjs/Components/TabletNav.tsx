"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabletNav() {
  const pathname = usePathname();

  return (
    <div className="bg-white/[0.04] backdrop-blur-lg p-8 w-full hidden md:flex lg:hidden">
      <nav className="w-full">
        <ul className="flex items-center justify-center gap-8">
          <li>
            <Link
              href="/"
              className={`text-white font-normal text-sm tracking-[2.7px] py-6 relative
                ${
                  pathname === "/"
                    ? "border-b-2 border-white"
                    : "border-b-2 border-transparent hover:border-white/50"
                }`}
            >
              <span className="font-bold mr-2">00</span> HOME
            </Link>
          </li>
          <li>
            <Link
              href="/destination"
              className={`text-white font-normal text-sm tracking-[2.7px] py-6 relative
                ${
                  pathname === "/destination"
                    ? "border-b-2 border-white"
                    : "border-b-2 border-transparent hover:border-white/50"
                }`}
            >
              <span className="font-bold mr-2">01</span> DESTINATION
            </Link>
          </li>
          <li>
            <Link
              href="/crew"
              className={`text-white font-normal text-sm tracking-[2.7px] py-6 relative
                ${
                  pathname === "/crew"
                    ? "border-b-2 border-white"
                    : "border-b-2 border-transparent hover:border-white/50"
                }`}
            >
              <span className="font-bold mr-2">02</span> CREW
            </Link>
          </li>
          <li>
            <Link
              href="/technology"
              className={`text-white font-normal text-sm tracking-[2.7px] py-6 relative
                ${
                  pathname === "/technology"
                    ? "border-b-2 border-white"
                    : "border-b-2 border-transparent hover:border-white/50"
                }`}
            >
              <span className="font-bold mr-2">03</span> TECHNOLOGY
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
