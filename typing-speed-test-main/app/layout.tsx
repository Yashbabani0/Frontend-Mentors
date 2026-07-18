import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import ConvexClientProvider from "@/lib/convex-client-provider";
import "./globals.css";

const sora = localFont({
  src: "../public/fonts/Sora/Sora-VariableFont_wght.ttf",
  variable: "--font-sora",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Typing Speed Test",
  description: "A responsive typing speed test challenge app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full">
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
