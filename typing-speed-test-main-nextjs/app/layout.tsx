import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@/components/Nav/Nav";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Typing Speed Test",
  description: "Typing speed test application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${sora.variable} antialiased `}>
          <Nav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
