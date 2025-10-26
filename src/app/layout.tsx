import type { Metadata } from "next";
import "./globals.css";

// 피그마 디자인에 맞는 폰트 변수 설정
const pretendard = {
  variable: "--font-pretendard",
  family: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
};

const bagelFatOne = {
  variable: "--font-bagel-fat-one", 
  family: "'BagelFatOne', cursive"
};

const helveticaNeue = {
  variable: "--font-helvetica-neue",
  family: "'Helvetica Neue', 'Inter', sans-serif"
};

export const metadata: Metadata = {
  title: "빵지순례",
  description: "맛있는 빵을 찾아 떠나는 빵지순례",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${bagelFatOne.variable} ${helveticaNeue.variable} antialiased`}
        style={{
          '--font-pretendard': pretendard.family,
          '--font-bagel-fat-one': bagelFatOne.family,
          '--font-helvetica-neue': helveticaNeue.family,
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
