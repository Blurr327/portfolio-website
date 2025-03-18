import React from "react";
import { SocialsData } from "@/lib/socials";
import Socials from "./Socials";

const Footer = ({ socials }: { socials: SocialsData }) => {
  return (
    <footer className="px-10 border-t border-t-zinc-500 py-10 flex flex-col md:flex-row items-center justify-between">
      <Socials socials={socials} size={32} className="flex flex-wrap gap-4" />
      <p className="text-sm text-zinc-500 mt-4 md:mt-0">
        &copy; {new Date().getFullYear()} JCI Rabat. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
