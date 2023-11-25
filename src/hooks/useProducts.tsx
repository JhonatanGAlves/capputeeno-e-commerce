"use client";
import { useContext } from "react";

import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

import { ProductsFetchResponseTypes } from "@/types/products-response";
import { FilterContext } from "@/context/FilterContext";
import { mountQueryFilter } from "@/utils/utils";
import { SortByTypes, TabTypes } from "@/types/filter-types";

interface useProductsProps {
  products: Product[] | undefined;
}

export default function useProducts(): useProductsProps {
  const { selectedTab, sortedBy } = useContext(FilterContext);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

  function fetcher(
    tab: TabTypes,
    sort: SortByTypes
  ): AxiosPromise<ProductsFetchResponseTypes> {
    return axios.post(BASE_URL, {
      query: `query {
        allProducts${mountQueryFilter(tab, sort)} {
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
    queryFn: () => fetcher(selectedTab, sortedBy),
    queryKey: ["products", selectedTab, sortedBy],
  });

  return { products: data?.data?.data?.allProducts };
}
