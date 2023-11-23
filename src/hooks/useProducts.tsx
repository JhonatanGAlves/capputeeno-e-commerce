import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

import { ProductsFetchResponseTypes } from "@/types/products-response";

interface useProductsProps {
  products: Product[] | undefined;
}

export default function useProducts(): useProductsProps {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

  function fetcher(): AxiosPromise<ProductsFetchResponseTypes> {
    return axios.post(BASE_URL, {
      query: `query {
                allProducts {
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
    queryFn: fetcher,
    queryKey: ["products"],
  });

  return { products: data?.data?.data?.allProducts };
}
