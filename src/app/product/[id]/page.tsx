"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Product from "@/components/product/Product";

export default function ProductPage() {
  const client = new QueryClient();

  const responsivePadding =
    "px-4 min-[920px]:px-10 min-[980px]:px-20 min-[1140px]:px-40";

  return (
    <QueryClientProvider client={client}>
      <main
        className={`flex flex-col ${responsivePadding} pt-[2.125rem] pb-[3.75rem]`}
      >
        <Product />
      </main>
    </QueryClientProvider>
  );
}
