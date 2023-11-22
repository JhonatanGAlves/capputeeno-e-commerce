import { KeyboardEvent, SetStateAction, useRef } from "react";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CaretDown, Check } from "@phosphor-icons/react";

interface SortByProps {
  showSortDropdown: boolean;
  setShowSortDropdown: (showSortDropdown: SetStateAction<boolean>) => void;
  sortedBy: string;
  setSortedBy: (sortedBy: SetStateAction<string>) => void;
}

export default function SortBy({
  showSortDropdown,
  setShowSortDropdown,
  sortedBy,
  setSortedBy,
}: SortByProps) {
  const sortRef = useRef(null);

  useOutsideClick(sortRef, () => {
    setShowSortDropdown(false);
  });

  function onKeyEscDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Escape" || e.keyCode === 27) {
      setShowSortDropdown(false);
    }
  }

  return (
    <div className="relative">
      <button
        ref={sortRef}
        className={`${
          showSortDropdown ? "is-open" : ""
        } flex items-center gap-2 hover:text-[--base-placeholder] transition-all focus:outline-none`}
        onClick={() => setShowSortDropdown((prevState) => !prevState)}
        tabIndex={0}
        onKeyDown={(e) => onKeyEscDown(e)}
      >
        <span className="text-sm">Sort by</span>
        <CaretDown size={16} />
      </button>
      {showSortDropdown && (
        <div className="px-4 py-3 bg-[--white] w-48 rounded absolute top-[1.875rem] right-0 transition-all">
          <ul className="flex flex-col gap-1 text-sm">
            <li
              className={`${
                sortedBy === "news"
                  ? "flex items-center gap-1 text-[--base-placeholder]"
                  : "pl-4"
              } hover:text-[--base-placeholder] cursor-pointer transition-all`}
            >
              <Check
                className={`${sortedBy === "news" ? "block" : "hidden"}`}
                size={12}
              />{" "}
              News
            </li>
            <li
              className={`${
                sortedBy === "bigger-smaller"
                  ? "flex items-center gap-1 text-[--base-placeholder]"
                  : "pl-4"
              } hover:text-[--base-placeholder] cursor-pointer transition-all`}
            >
              <Check
                className={`${
                  sortedBy === "bigger-smaller" ? "block" : "hidden"
                }`}
                size={12}
              />{" "}
              Price: Higher - lower
            </li>
            <li
              className={`${
                sortedBy === "smaller-bigger"
                  ? "flex items-center gap-1 text-[--base-placeholder]"
                  : "pl-4"
              } hover:text-[--base-placeholder] cursor-pointer transition-all`}
            >
              <Check
                className={`${
                  sortedBy === "smaller-bigger" ? "block" : "hidden"
                }`}
                size={12}
              />{" "}
              Price: Lower - higher
            </li>
            <li
              className={`${
                sortedBy === "best-sellers"
                  ? "flex items-center gap-1 text-[--base-placeholder]"
                  : "pl-4"
              } hover:text-[--base-placeholder] cursor-pointer transition-all`}
            >
              <Check
                className={`${
                  sortedBy === "best-sellers" ? "block" : "hidden"
                }`}
                size={12}
              />{" "}
              Best sellers
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
