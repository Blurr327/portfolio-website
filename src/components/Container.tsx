import clsx from "clsx";
import { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("px-8 py-8 md:px-24 md:py-20", className)}>
      {children}
    </div>
  );
}
