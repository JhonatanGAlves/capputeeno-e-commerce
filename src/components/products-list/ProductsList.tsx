import useProducts from "@/hooks/useProducts";
import ProductCard from "../product-card/ProductCard";

export function ProductsList() {
  const { products } = useProducts();

  return (
    <div className="grid gap-8 mt-8 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
