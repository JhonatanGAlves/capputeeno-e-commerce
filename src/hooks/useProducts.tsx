"use client";
import { useContext, useEffect, useState } from "react";

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
  const [products, setProducts] = useState<Product[]>([]);
  const { selectedTab, sortedBy, inputTxt, page } = useContext(FilterContext);

  const { data } = useQuery({
    queryFn: () => fetcher(selectedTab, sortedBy, page),
    queryKey: ["products", selectedTab, sortedBy, page],
  });

  const filteredProducts = products.filter((product) =>
    product?.name?.toLowerCase()?.includes(inputTxt.toLowerCase())
  );

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

  function fetcher(
    tab: TabTypes,
    sort: SortByTypes,
    page: number
  ): AxiosPromise<ProductsFetchResponseTypes> {
    return axios.post(BASE_URL, {
      query: `query { 
        allProducts${mountQueryFilter(tab, sort, 12, page)} {
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

  useEffect(() => {
    if (data?.data?.data?.allProducts) {
      setProducts(data?.data?.data?.allProducts);
    }
  }, [data?.data?.data?.allProducts]);

  return { products: filteredProducts };
}
