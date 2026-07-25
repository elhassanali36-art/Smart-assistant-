import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "بوستك الذكي | Postik AI - منصة إدارة التواصل الاجتماعي وفيديوهات الإعلانات بالذكاء الاصطناعي",
  description: "اربط حساباتك الاجتماعية، أتمت النشر بالنيابة عنك، واصنع فيديوهات إعلانية بالذكاء الاصطناعي بضغطة زر.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
