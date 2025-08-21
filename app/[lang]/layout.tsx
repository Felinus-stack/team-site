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
  title: "源境团队",
  description:
    "河南师范大学源境软件工作室，专注于软件开发与技术创新",
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
          <ClosestSectionProvider>
            <ToasterProvider />
            <Navbar lang={params.lang} dict={dict.navigation} />
            <SideBar dict={dict.sidebar} />
            {children}
            <FooterSection dict={dict.footer} />
          </ClosestSectionProvider>
          <SpeedInsights />
          <Analytics />
        </ClientOnly>
      </body>
    </html>
  );
}
