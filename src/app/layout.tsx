import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import Layout from "@/components/GeneralLayout";
import "./globals.css";
import { ReactNode } from "react";

const fira_code = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BM",
  description: "Le site officiel de Mohamed BEN EL MOSTAPHA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr" className="overscroll-none">
      <body
        className={
          fira_code.className +
          " bg-gradient-to-br from-[#EDEEEB] via-[#FFFFFF] to-[#CCC7BF] break-words"
        }
      >
        <div className="flex w-full">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
