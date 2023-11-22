"use client";
import { useState } from "react";

import SortBy from "@/components/sort-by/SortBy";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("all-products");
  const [sortedBy, setSortedBy] = useState("news");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const responsivePadding =
    "px-4 min-[920px]:px-10 min-[980px]:px-20 min-[1140px]:px-40";

  return (
    <main className={`flex flex-col ${responsivePadding} py-[2.125rem]`}>
      <div className="flex justify-between items-center">
        <nav>
          <ul className="flex items-center gap-10 uppercase">
            <li
              className={`${
                selectedTab === "all-products"
                  ? "font-semibold text-[--gray-800] border-[--orange-400]"
                  : "border-transparent"
              } pb-1 border-b-4 border-solid cursor-pointer hover:border-[--orange-400] transition-all`}
            >
              all products
            </li>
            <li
              className={`${
                selectedTab === "t-shirts"
                  ? "font-semibold text-[--gray-800] border-[--orange-400]"
                  : "border-transparent"
              } pb-1 border-b-4 border-solid cursor-pointer hover:border-[--orange-400] transition-all`}
            >
              t-shirts
            </li>
            <li
              className={`${
                selectedTab === "mugs"
                  ? "font-semibold text-[--gray-800] border-[--orange-400]"
                  : "border-transparent"
              } pb-1 border-b-4 border-solid cursor-pointer hover:border-[--orange-400] transition-all`}
            >
              mugs
            </li>
          </ul>
        </nav>

        <SortBy
          showSortDropdown={showSortDropdown}
          setShowSortDropdown={setShowSortDropdown}
          sortedBy={sortedBy}
          setSortedBy={setSortedBy}
        />
      </div>
    </main>
  );
}
