import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = localFont({
  src: [
    { path: "../public/fonts/DM_Sans/static/DMSans-Light.ttf", weight: "300" },
    { path: "../public/fonts/DM_Sans/static/DMSans-Medium.ttf", weight: "500" },
    { path: "../public/fonts/DM_Sans/static/DMSans-SemiBold.ttf", weight: "600" },
    { path: "../public/fonts/DM_Sans/static/DMSans-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../public/fonts/DM_Sans/static/DMSans-Bold.ttf", weight: "700" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const bricolage = localFont({
  src: "../public/fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf",
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weather Now",
  description: "Current conditions and seven-day weather forecasts for locations worldwide.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${dmSans.variable} ${bricolage.variable}`}><body>{children}</body></html>;
}
