"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ComponentPropsWithRef, ReactNode, useState } from "react";
import Image from "next/image";
import { GeneralConfig, TabLabels } from "@/lib/config";

const NavItem = ({ href, children }: { href: string; children: ReactNode }) => {
  const pathName = usePathname();
  const isActive = pathName === href + "/" || pathName === href;
  return (
    <li className="flex">
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition h-full flex items-center justify-center",
          isActive
            ? "text-[white] bg-[#3E96F4] rounded-lg"
            : "hover:text-[white] hover:bg-[#3E96F4] rounded-lg"
        )}
      >
        {children}
      </Link>
    </li>
  );
};

const DesktopNavigation = (
  props: ComponentPropsWithRef<"nav"> & { tab_labels: TabLabels }
) => {
  return (
    <nav {...props}>
      <ul className="flex justify-evenly items-center h-full px-3 text-l font-medium text-zinc-800">
        <NavItem href="/">{props.tab_labels.home}</NavItem>
        <NavItem href="/blog">{props.tab_labels.blog}</NavItem>
        <NavItem href="/contact">{props.tab_labels.contact}</NavItem>
      </ul>
    </nav>
  );
};

const MobileNavItem = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link href={href}>
      <li className="px-4 py-2 hover:bg-gray-100">{children}</li>
    </Link>
  );
};

const MobileNavigation = ({ tab_labels }: { tab_labels: TabLabels }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden mx-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-zinc-800 focus:outline-none"
      >
        {/* Hamburger Icon */}
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          className="absolute top-20 right-4 w-48 rounded-lg shadow-lg py-2 z-50 bg-white"
          onClick={() => setIsOpen(false)}
        >
          <MobileNavItem href="/">{tab_labels.home}</MobileNavItem>
          <MobileNavItem href="/blog">{tab_labels.blog}</MobileNavItem>
          <MobileNavItem href="/contact">{tab_labels.contact}</MobileNavItem>
        </ul>
      )}
    </div>
  );
};

export default function Header({
  generalConfig,
}: {
  generalConfig: GeneralConfig;
}) {
  return (
    <header className="top-0 w-full flex justify-between items-center md:px-12 border-b border-b-zinc-500">
      <Link href={"/"}>
        <Image
          src="/portfolio-website/img/sig.png"
          alt="Initials"
          className="object-cover mx-4 my-2"
          width="100"
          height="100"
        />
      </Link>
      <div className="flex md:flex-1 justify-end md:justify-center h-full">
        {/* desktop navigation */}
        <DesktopNavigation
          tab_labels={generalConfig.tab_labels}
          className="w-[60%] flex flex-col pointer-events-auto hidden md:block"
        />
      </div>
      <div className="flex items-center gap-5">
        {/* MobileNavigation */}
        <MobileNavigation tab_labels={generalConfig.tab_labels} />
      </div>
    </header>
  );
}
