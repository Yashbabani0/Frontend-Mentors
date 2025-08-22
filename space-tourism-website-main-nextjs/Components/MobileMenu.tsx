"use client";
import MenuOpen from "@/public/assets/shared/icon-hamburger.svg";
import MenuClose from "@/public/assets/shared/icon-close.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative z-10 md:hidden">
      <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Image src={MenuOpen} width={24} height={24} alt={"open menu"} />
      </button>

      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-[254px] bg-white/[0.04] backdrop-blur-lg p-8">
          <button
            className="cursor-pointer w-full flex justify-end"
            onClick={() => setIsOpen(false)}
          >
            <Image src={MenuClose} width={24} height={24} alt={"close menu"} />
          </button>
          <nav className="mt-14 w-full">
            <ul className="flex flex-col gap-8 w-full">
              <li>
                <Link
                  href="/"
                  className={`text-white font-normal text-base tracking-[2.7px] block py-2 
                    ${pathname === "/" ? "border-r-4 border-white" : ""}`}
                >
                  <span className="font-bold mr-3">00</span> HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/destination"
                  className={`text-white font-normal text-base tracking-[2.7px] block py-2
                    ${
                      pathname === "/destination"
                        ? "border-r-4 border-white"
                        : ""
                    }`}
                >
                  <span className="font-bold mr-3">01</span> DESTINATION
                </Link>
              </li>
              <li>
                <Link
                  href="/crew"
                  className={`text-white font-normal text-base tracking-[2.7px] block py-2
                    ${pathname === "/crew" ? "border-r-4 border-white" : ""}`}
                >
                  <span className="font-bold mr-3">02</span> CREW
                </Link>
              </li>
              <li>
                <Link
                  href="/technology"
                  className={`text-white font-normal text-base tracking-[2.7px] block py-2
                    ${
                      pathname === "/technology"
                        ? "border-r-4 border-white"
                        : ""
                    }`}
                >
                  <span className="font-bold mr-3">03</span> TECHNOLOGY
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
