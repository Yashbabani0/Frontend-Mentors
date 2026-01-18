import logo from "@/public/logo-large.svg";
import logoMobile from "@/public/logo-small.svg";
import PersonalBest from "./PersonalBest";
import SignIn from "./SignIn";

export default function Nav() {
  return (
    <nav className="mx-auto w-screen max-w-[85em] p-8 flex items-center justify-between font-sora">
      <picture>
        <source media="(max-width: 600px)" srcSet={logoMobile.src} />
        <img src={logo.src} alt="Typing Speed Test Logo" />
      </picture>
      <div className="flex items-center justify-center gap-8">
        <PersonalBest />
        <SignIn />
      </div>
    </nav>
  );
}
