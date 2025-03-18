"use client";
import React from "react";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon, InstagramIcon } from "next-share";
import { GmailIcon } from "@/components/CustomSVGIcons";
import { SocialsData } from "@/lib/socials";

export default function Socials({
  socials,
  className,
  size,
}: {
  socials: SocialsData;
  className?: string;
  size: number;
}) {
  return (
    <div className="flex-1 flex flex-col gap-12">
      <div className={className}>
        <Link href={socials.facebook}>
          <FacebookIcon size={size} round />
        </Link>
        <Link href={socials.linkedIn}>
          <LinkedinIcon size={size} round />
        </Link>
        <Link href={socials.gmail}>
          <GmailIcon size={size} />
        </Link>
        <Link href={socials.instagram}>
          <InstagramIcon size={size} round />
        </Link>
      </div>
    </div>
  );
}
