import "./globals.css";
import "./prism.css";
import og from "./og.jpg";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tractor Loader",
  description: "A webpack loader to help you with your crops and other image adjustments.",
  icons: [
    "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚜</text></svg>",
  ],
  openGraph: {
    title: "Tractor Loader",
    description: "A webpack loader to help you with your crops and other image adjustments.",
    images: [
      {
        url: og.src,
        width: og.width,
        height: og.height,
        alt: "Tractor Loader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jasonthorsness",
    creator: "@jasonthorsness",
    description: "A webpack loader to help you with your crops and other image adjustments.",
    title: "Tractor Loader",
    images: [
      {
        url: og.src,
        width: og.width,
        height: og.height,
        alt: "Tractor Loader",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " dark:bg-black"}>{children}</body>
    </html>
  );
}
