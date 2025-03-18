import React from "react";
import Container from "./Container";
import clsx from "clsx";

const BasicLayout = ({
  title,
  intro,
  children,
  className,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Container className={clsx("w-full", className)}>
      <header className="flex flex-col justify-start items-start">
        <h1 className="md:text-5xl font-bold tracking-tight text-shadow text-zinc-900 text-4xl">
          {title}
        </h1>
        <p className="mt-6 text-base md:text-2xl text-zinc-500">{intro}</p>
      </header>
      {children && <div className="mt-8 sm:mt-16">{children}</div>}
    </Container>
  );
};

export default BasicLayout;
