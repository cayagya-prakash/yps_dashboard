import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./style.css"
import { Toaster } from "@/components/ui/sonner";

import { Playfair_Display, Inter } from "next/font/google";
export const metadata = {
  title: "Yagya Prakash Sharda & Co.",
};
export const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="background-color"
      >
        {children}
        <Toaster />
      </body>

    </html>
  );
}
