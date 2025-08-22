import logo from "@/public/assets/shared/logo.svg";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import TabletNav from "./TabletNav";
import PcNav from "./PcNav";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="logo md:p-8 lg:p-14">
        <Image src={logo} alt="Logo" width={48} height={48} />
      </Link>
      <TabletNav />
      <MobileMenu />
      <PcNav />
    </nav>
  );
}
