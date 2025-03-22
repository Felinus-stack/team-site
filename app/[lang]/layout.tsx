import type { Metadata } from "next";
import { Open_Sans, Syncopate } from "next/font/google";

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

const font = Open_Sans({ subsets: ["latin"] });
const syncopate = Syncopate({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "PWR Racing",
  description:
    "Koło naukowe Politechniki Wrocławskiej zajmujące się budową bolidów",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

type Locale = "pl" | "en";

const isLocale = (lang: string): lang is Locale => {
  return lang === "pl" || lang === "en";
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
