import Header from "./Header";
import Footer from "./Footer";
import { getGeneralConfig } from "@/lib/config";
import { getSocialsData } from "@/lib/socials";
import { ReactNode } from "react";

export default async function GeneralLayout({
  children,
}: {
  children: ReactNode;
}) {
  const generalConfig = await getGeneralConfig();
  const socials = await getSocialsData();
  return (
    <>
      <div className="relative flex w-full flex-col">
        <Header generalConfig={generalConfig} />
        {children}
        <Footer socials={socials} />
      </div>
    </>
  );
}
