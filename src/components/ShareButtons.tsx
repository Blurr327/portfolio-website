"use client";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function ShareButtons({ className, size = 64 }: { className?: string, size?: number }) {
  const url = "https://" + process.env.NEXT_PUBLIC_HOST + usePathname();
  return (
    <div className={clsx(className, "flex justify-center gap-12")}>
      <div className="text-1xl text-zinc-400 w-full">
        Partagez l&apos;article !
      </div>
      <FacebookShareButton url={url}>
        <FacebookIcon size={size} round />
      </FacebookShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon size={size} round />
      </LinkedinShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon size={size} round />
      </TwitterShareButton>
    </div>
  );
}
