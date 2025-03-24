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
    <div className={clsx("px-6 py-8 md:px-24 md:py-20 grow-1", className)}>
      {children}
    </div>
  );
}
