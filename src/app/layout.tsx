import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "@/components/GeneralLayout";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JCI Rabat",
  description: "Le site officiel de la JCI de Rabat.",
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
          inter.className +
          " bg-gradient-to-br from-gray-100 via-blue-100 to-indigo-100 break-words"
        }
      >
        <div className="flex w-full">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
