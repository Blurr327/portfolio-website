import React from "react";
import { SocialsData } from "@/lib/socials";
import Socials from "./Socials";

const Footer = ({ socials }: { socials: SocialsData }) => {
  return (
    <footer className="px-10 border-t grow-0 border-t-zinc-500 py-10 flex-row items-center justify-between">
      <Socials
        socials={socials}
        size={32}
        className="flex flex-wrap justify-center gap-4 my-2"
      />
      <p className="text-sm text-zinc-500 text-center mt-4 md:mt-0">
        &copy; {new Date().getFullYear()} BEN EL MOSTAPHA Mohamed. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
