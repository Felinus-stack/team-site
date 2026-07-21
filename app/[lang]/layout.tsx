import type { Metadata } from "next";
import localFont from "next/font/local";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientOnly from "../components/ClientOnly";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import ClosestSectionProvider from "../components/Navbar/ClosestSectionContext";
import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/Navbar/SideBar";
import FooterSection from "../components/Section/FooterSection/FooterSection";
import "../globals.css";
import ToasterProvider from "../providers/ToasterProvider";
import { AuthProvider } from "../context/Auth/AuthContext";
import AiChatWidget from "../components/AiChatWidget";
import { getDictionary } from "./dictionaries";

export async function generateStaticParams() {
  return [{ lang: "pl" }, { lang: "en" }];
}

const font = localFont({
  src: [
    {
      path: "../../public/fonts/Syncopate-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-open-sans",
});

const syncopate = localFont({
  src: [
    {
      path: "../../public/fonts/Syncopate-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Syncopate-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-syncopate",
});

export const metadata: Metadata = {
  title: {
    default: "源境团队 - 专业软件开发与技术创新团队",
    template: "%s | 源境团队"
  },
  description:
    "源境软件工作室成立于2018年，是专注于Go/Python/Java编程、Web开发和算法竞赛的专业学生团队。已完成15+校园项目，获得蓝桥杯等编程竞赛奖项。",
  keywords: [
    "源境团队",
    "软件开发",
    "编程团队",
    "算法竞赛",
    "Web开发",
    "Go语言",
    "Python开发",
    "Java编程",
    "蓝桥杯",
    "技术创新",
    "校园项目",
    "程序设计",
    "前端开发",
    "后端开发",
    "移动开发"
  ],
  authors: [{ name: "源境团队", url: "http://8.136.112.63" }],
  creator: "源境团队",
  publisher: "源境团队",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://8.136.112.63"),
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/ch",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "http://8.136.112.63",
    title: "源境团队 - 专业软件开发与技术创新团队",
    description: "源境软件工作室成立于2018年，专注于软件开发与技术创新的专业学生团队。",
    siteName: "源境团队",
    images: [
      {
        url: "/images/logo.png",
        width: 135,
        height: 125,
        alt: "源境团队Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "源境团队 - 专业软件开发团队",
    description: "源境软件工作室成立于2018年，专注于软件开发与技术创新。",
    images: ["/images/logo.png"],
    creator: "@yuanjingteam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // 获得验证码后替换
  },
  other: {
    "baidu-site-verification": "your-baidu-verification-code", // 获得验证码后替换
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

type Locale = "ch" | "en";

const isLocale = (lang: string): lang is Locale => {
  return lang === "ch" || lang === "en";
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const language = isLocale(params.lang) ? params.lang : "en";
  const dict = await getDictionary(language);
  return (
    <html lang={params.lang}>
      <body className={font.className}>
        <ClientOnly>
          <AuthProvider>
            <ClosestSectionProvider>
              <ToasterProvider />
              <Navbar lang={params.lang} dict={dict.navigation} />
              <SideBar dict={dict.sidebar} />
              {children}
              <FooterSection dict={dict.footer} />
              <AiChatWidget />
            </ClosestSectionProvider>
            {process.env.VERCEL && (
              <>
                <SpeedInsights />
                <Analytics />
              </>
            )}
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
