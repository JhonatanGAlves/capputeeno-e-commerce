import { SetStateAction } from "react";

import useProducts from "@/hooks/useProducts";
import ProductCard from "../product-card/ProductCard";
import PageControl from "../pages/PageControl";

interface ProductsListProps {
  page: number;
  setPage: (page: SetStateAction<number>) => void;
}

export function ProductsList({ page, setPage }: ProductsListProps) {
  const { products } = useProducts();

  return (
    <>
      <div className={`${!products?.length && "hidden"} flex justify-end mt-6`}>
        <PageControl page={page} setPage={setPage} />
      </div>
      <div className="grid gap-8 mt-8 grid-cols-auto-fill xl:grid-cols-4 justify-center">
        {products?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div
        className={`${
          !products?.length && "hidden"
        } flex justify-end mt-[4.625rem]`}
      >
        <PageControl page={page} setPage={setPage} />
      </div>
    </>
  );
}
