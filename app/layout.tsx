import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google"; // 감성 폰트로 교체
import "./globals.css";

const sansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["300", "400", "500"] });
const serifKr = Noto_Serif_KR({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "위브스냅 | Weve Snap - 찰나의 기록, 영원이 되는 순간",
  description: "본식스냅 전문 프리미엄 브랜드 위브스냅입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${sansKr.className} ${serifKr.variable} scroll-smooth`}>
      <body className="bg-[#f6f2ec] text-[#1d1815] antialiased">
        {children}
      </body>
    </html>
  );
}