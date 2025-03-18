"use client";
import { useState } from "react";
import Link from "next/link";

export default function TagPicker({
  tags,
  selectedTag,
}: {
  tags: string[];
  selectedTag?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentTagText = selectedTag ?? "Pas de catégorie sélectionnée";

  return (
    <div className="relative my-6 md:my-12 md:m-4 self-center">
      {/* Button */}
      <button
        className="relative bg-orange-400 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full transition-all z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm md:text-base">Catégorie</p>
        <div className="text-zinc-500 px-2 py-1 absolute rounded-full top-0 left-0 bottom-0 pl-[110%] w-[max-content] max-w-[85vw] md:max-w-[60vw] lg:max-w-[45vw] flex justify-between items-center transition border border-orange-400 hover:text-orange-400">
          <p className="ml-auto text-sm md:text-base flex justify-center items-center p-4">
            {currentTagText}
          </p>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul
          className="absolute top-12 w-[85vw] md:w-48 lg:w-56 max-w-md rounded-lg shadow-lg py-2 z-50 bg-white transition-all"
          onClick={() => setIsOpen(false)}
        >
          {tags.map((tag) => (
            <Link href={`/blog/tag/${tag}`} key={tag}>
              <li
                key={tag}
                className="px-4 py-2 text-sm md:text-base hover:bg-gray-100 transition-colors"
              >
                {tag}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
