import Link from "next/link";
import clsx from "clsx";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

type PaginationLinkProps = {
  children: ReactNode;
  link: string;
  isCurrent?: boolean;
  isDisabled?: boolean;
};

function PaginationLink({
  link,
  children,
  isCurrent = false,
  isDisabled = false,
}: Readonly<PaginationLinkProps>) {
  return (
    <Link
      href={link}
      className={clsx(
        "px-3 py-2 border border-gray-300 rounded-2xl flex",
        isCurrent
          ? "bg-blue-600 text-white"
          : isDisabled
            ? "bg-gray-500 text-white"
            : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700",
      )}
    >
      {children}
    </Link>
  );
}

export type PaginationProps = {
  id: string;
  count: number;
  current: number;
  getPageLink: (pageNumber: number) => string;
};

export default function Pagination({
  id,
  count,
  current,
  getPageLink,
}: Readonly<PaginationProps>) {
  return (
    <div className="flex justify-center mt-12" id={id}>
      <nav aria-label="Page navigation">
        <ul className="inline-flex items-center">
          <li>
            <PaginationLink
              link={current !== 1 ? getPageLink(current - 1) : `#${id}`}
              isDisabled={current === 1}
            >
              <ChevronLeft />
            </PaginationLink>
          </li>

          {Array.from({ length: count }, (_, i) => (
            <li key={i + 1}>
              <PaginationLink
                isCurrent={i + 1 == current}
                link={getPageLink(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </li>
          ))}
          <PaginationLink
            link={current !== count ? getPageLink(current + 1) : `#${id}`}
            isDisabled={current === count}
          >
            <ChevronRight />
          </PaginationLink>
        </ul>
      </nav>
    </div>
  );
}
