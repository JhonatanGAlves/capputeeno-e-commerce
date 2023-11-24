import useProducts from "@/hooks/useProducts";
import ProductCard from "../product-card/ProductCard";

export function ProductsList() {
  const { products } = useProducts();

  return (
    <div className="grid gap-8 mt-8 grid-cols-auto-fill xl:grid-cols-4 justify-center">
      {products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
