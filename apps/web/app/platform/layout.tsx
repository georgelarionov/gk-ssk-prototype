import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./styles.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-platform-inter",
  display: "swap",
});

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return <div className={inter.variable}>{children}</div>;
}
