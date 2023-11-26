"use client";
import { useEffect, useState } from "react";

import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

import { ProductFetchResponseTypes } from "@/types/product-response";

interface useSingleProductProps {
  product: Product | null;
}

export default function useSingleProduct(
  productId: string
): useSingleProductProps {
  const [product, setProduct] = useState<Product | null>(null);

  const { data } = useQuery({
    queryFn: () => fetcher(productId),
    queryKey: ["product"],
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

  function fetcher(id: string): AxiosPromise<ProductFetchResponseTypes> {
    return axios.post(BASE_URL, {
      query: `query { 
        Product(id: "${id}") {
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
    if (data?.data?.data?.Product) {
      setProduct(data?.data?.data?.Product);
    }
  }, [data?.data?.data?.Product]);

  return { product };
}
