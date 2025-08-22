"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PcNav() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex relative">
      <div
        className="absolute right-[100%] top-1/2 h-[0.5px] bg-zinc-50 -z-10
        lg:min-w-[10em] xl:min-w-[20em]"
      ></div>
      <nav className="bg-white/[0.04] backdrop-blur-lg px-32 py-8">
        <ul className="flex items-center gap-12">
          <li>
            <Link
              href="/"
              className={`text-white font-normal text-sm tracking-[2.7px] relative py-8
                ${
                  pathname === "/"
                    ? "after:absolute after:content-[''] after:h-[3px] after:bg-white after:w-full after:bottom-0 after:left-0"
                    : "after:absolute after:content-[''] after:h-[3px] after:bg-white/0 after:w-full after:bottom-0 after:left-0 hover:after:bg-white/50"
                }`}
            >
              <span className="font-bold mr-3">00</span> HOME
            </Link>
          </li>
          <li>
            <Link
              href="/destination"
              className={`text-white font-normal text-sm tracking-[2.7px] relative py-8
                ${
                  pathname === "/destination"
                    ? "after:absolute after:content-[''] after:h-[3px] after:bg-white after:w-full after:bottom-0 after:left-0"
                    : "after:absolute after:content-[''] after:h-[3px] after:bg-white/0 after:w-full after:bottom-0 after:left-0 hover:after:bg-white/50"
                }`}
            >
              <span className="font-bold mr-3">01</span> DESTINATION
            </Link>
          </li>
          <li>
            <Link
              href="/crew"
              className={`text-white font-normal text-sm tracking-[2.7px] relative py-8
                ${
                  pathname === "/crew"
                    ? "after:absolute after:content-[''] after:h-[3px] after:bg-white after:w-full after:bottom-0 after:left-0"
                    : "after:absolute after:content-[''] after:h-[3px] after:bg-white/0 after:w-full after:bottom-0 after:left-0 hover:after:bg-white/50"
                }`}
            >
              <span className="font-bold mr-3">02</span> CREW
            </Link>
          </li>
          <li>
            <Link
              href="/technology"
              className={`text-white font-normal text-sm tracking-[2.7px] relative py-8
                ${
                  pathname === "/technology"
                    ? "after:absolute after:content-[''] after:h-[3px] after:bg-white after:w-full after:bottom-0 after:left-0"
                    : "after:absolute after:content-[''] after:h-[3px] after:bg-white/0 after:w-full after:bottom-0 after:left-0 hover:after:bg-white/50"
                }`}
            >
              <span className="font-bold mr-3">03</span> TECHNOLOGY
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
