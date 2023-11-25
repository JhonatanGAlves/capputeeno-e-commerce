"use client";
import { useContext } from "react";

import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

import { ProductsFetchResponseTypes } from "@/types/products-response";
import { FilterContext } from "@/context/FilterContext";
import { formatSelectedTab } from "@/utils/utils";
import { TabTypes } from "@/types/filter-types";

interface useProductsProps {
  products: Product[] | undefined;
}

export default function useProducts(): useProductsProps {
  const { selectedTab } = useContext(FilterContext);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

  function fetcher(tab: TabTypes): AxiosPromise<ProductsFetchResponseTypes> {
    return axios.post(BASE_URL, {
      query: `query {
        allProducts${
          tab !== TabTypes.ALL
            ? `(filter: {category: "${formatSelectedTab(tab)}"})`
            : ""
        } {
          id
          name
          description
          price_in_cents
          image_url
          created_at
          category
          sales
        }
      }`,
    });
  }

  const { data } = useQuery({
    queryFn: () => fetcher(selectedTab),
    queryKey: ["products", selectedTab],
  });

  return { products: data?.data?.data?.allProducts };
}
