import { SetStateAction } from "react";

import { TabTypes } from "@/types/filter-types";

interface TabsProps {
  selectedTab: TabTypes;
  setSelectedTab: (value: SetStateAction<TabTypes>) => void;
}

export function Tabs({ selectedTab, setSelectedTab }: TabsProps) {
  return (
    <nav>
      <ul className="flex items-center gap-10 uppercase">
        <li
          className={`${
            selectedTab === TabTypes.ALL
              ? "font-semibold text-[--gray-800] border-[--orange-400]"
              : "border-transparent"
          } pb-1 border-b-4 border-solid cursor-pointer hover:border-[--orange-400] transition-all`}
        >
          all products
        </li>
        <li
          className={`${
            selectedTab === TabTypes.SHIRT
              ? "font-semibold text-[--gray-800] border-[--orange-400]"
              : "border-transparent"
          } pb-1 border-b-4 border-solid cursor-pointer hover:border-[--orange-400] transition-all`}
        >
          t-shirts
        </li>
        <li
          className={`${
            selectedTab === TabTypes.MUG
              ? "font-semibold text-[--gray-800] border-[--orange-400]"
              : "border-transparent"
          } pb-1 border-b-4 border-solid cursor-pointer hover:border-[--orange-400] transition-all`}
        >
          mugs
        </li>
      </ul>
    </nav>
  );
}
