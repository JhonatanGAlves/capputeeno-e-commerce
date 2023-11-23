"use client";
import { useContext } from "react";

import SortBy from "@/components/sort-by/SortBy";
import { FilterContext } from "@/context/FilterContext";
import { Tabs } from "@/components/tabs/Tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductsList } from "@/components/products-list/ProductsList";

export default function Home() {
  const { selectedTab, setSelectedTab, sortedBy, setSortedBy } =
    useContext(FilterContext);

  const responsivePadding =
    "px-4 min-[920px]:px-10 min-[980px]:px-20 min-[1140px]:px-40";

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <main className={`flex flex-col ${responsivePadding} py-[2.125rem]`}>
        <div className="flex justify-between items-center">
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

          <SortBy sortedBy={sortedBy} setSortedBy={setSortedBy} />
        </div>
        <ProductsList />
      </main>
    </QueryClientProvider>
  );
}
