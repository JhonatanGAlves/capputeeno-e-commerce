import { KeyboardEvent, SetStateAction, useRef, useState } from "react";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CaretDown, Check } from "@phosphor-icons/react";
import { SortByTypes } from "@/types/filter-types";

interface SortByProps {
  sortedBy: SortByTypes;
  setSortedBy: (sortedBy: SetStateAction<SortByTypes>) => void;
}

export default function SortBy({ sortedBy, setSortedBy }: SortByProps) {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
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
        <div className="px-4 py-3 bg-[--white] w-52 rounded absolute top-[1.875rem] right-0 transition-all">
          <ul className="flex flex-col gap-1 text-sm">
            <li
              className={`${
                sortedBy === SortByTypes.NEWS
                  ? "flex items-center gap-1 text-[--base-placeholder]"
                  : "pl-4"
              } hover:text-[--base-placeholder] cursor-pointer transition-all`}
              onClick={() => {
                setSortedBy(SortByTypes.NEWS);
                setShowSortDropdown(false);
              }}
            >
              <Check
                className={`${
                  sortedBy === SortByTypes.NEWS ? "block" : "hidden"
                }`}
                size={12}
              />{" "}
              News
            </li>
            <li
              className={`${
                sortedBy === SortByTypes.BIGGEST
                  ? "flex items-center gap-1 text-[--base-placeholder]"
                  : "pl-4"
              } hover:text-[--base-placeholder] cursor-pointer transition-all`}
              onClick={() => {
                setSortedBy(SortByTypes.BIGGEST);
                setShowSortDropdown(false);
              }}
            >
              <Check
                className={`${
                  sortedBy === SortByTypes.BIGGEST ? "block" : "hidden"
                }`}
                size={12}
              />{" "}
              Price: Higher - lower
            </li>
            <li
              className={`${
                sortedBy === SortByTypes.SMALLEST
                  ? "flex items-center gap-1 text-[--base-placeholder]"
                  : "pl-4"
              } hover:text-[--base-placeholder] cursor-pointer transition-all`}
              onClick={() => {
                setSortedBy(SortByTypes.SMALLEST);
                setShowSortDropdown(false);
              }}
            >
              <Check
                className={`${
                  sortedBy === SortByTypes.SMALLEST ? "block" : "hidden"
                }`}
                size={12}
              />{" "}
              Price: Lower - higher
            </li>
            <li
              className={`${
                sortedBy === SortByTypes.BEST_SELLER
                  ? "flex items-center gap-1 text-[--base-placeholder]"
                  : "pl-4"
              } hover:text-[--base-placeholder] cursor-pointer transition-all`}
              onClick={() => {
                setSortedBy(SortByTypes.BEST_SELLER);
                setShowSortDropdown(false);
              }}
            >
              <Check
                className={`${
                  sortedBy === SortByTypes.BEST_SELLER ? "block" : "hidden"
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
