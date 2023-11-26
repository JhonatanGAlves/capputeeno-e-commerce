"use client";
import {
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

import { SortByTypes, TabTypes } from "@/types/filter-types";

interface FilterContextProps {
  inputTxt: string;
  setInputTxt: (value: string) => void;
  selectedTab: TabTypes;
  setSelectedTab: (value: SetStateAction<TabTypes>) => void;
  sortedBy: SortByTypes;
  setSortedBy: (value: SetStateAction<SortByTypes>) => void;
  page: number;
  setPage: (value: SetStateAction<number>) => void;
}

interface FilterContextProviderProps {
  children: ReactNode;
}

export const FilterContext = createContext<FilterContextProps>(
  {} as FilterContextProps
);

export default function FilterContextProvider({
  children,
}: FilterContextProviderProps) {
  const [inputTxt, setInputTxt] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<TabTypes>(TabTypes.ALL);
  const [sortedBy, setSortedBy] = useState<SortByTypes>(SortByTypes.NEWS);
  const [page, setPage] = useState<number>(0);

  const values = useMemo(() => {
    return {
      inputTxt,
      setInputTxt,
      selectedTab,
      setSelectedTab,
      sortedBy,
      setSortedBy,
      page,
      setPage,
    };
  }, [inputTxt, selectedTab, sortedBy, page]);

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
}
