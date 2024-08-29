import { useContext, useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ArrowUUpLeft, ShoppingBagOpen } from "@phosphor-icons/react";

import useSingleProduct from "@/hooks/useSingleProduct";
import { formatCentsToDollar } from "@/utils/utils";
import { CapputeenoContext } from "@/context/CapputeenoContext";

export default function Product() {
  const [widthContent, setWidthContent] = useState(0);
  const elementRef = useRef(null);

  const { id } = useParams();
  const { product } = useSingleProduct(id as string);
  const { addItemToCart } = useContext(CapputeenoContext);

  function handleResize() {
    if (elementRef?.current) {
      setWidthContent((elementRef.current as HTMLDivElement).offsetWidth);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Link href={"/"} className="flex items-center gap-2 w-fit">
        <div className=" rounded-full border-[2px] border-solid border-[--gray-500] flex justify-center items-center p-[0.28125rem]">
          <ArrowUUpLeft size={16} weight="bold" color="var(--gray-500)" />
        </div>
        <span className="font-medium text-sm text-[--gray-500]">Back</span>
      </Link>
      <div
        ref={elementRef}
        className={`flex ${
          widthContent <= 640 ? "flex-col justify-center" : "justify-between"
        } mt-[1.375rem] gap-8`}
      >
        {product?.image_url && (
          <Image
            src={product?.image_url}
            alt="Product image"
            width={
              widthContent <= 1024 && widthContent > 768
                ? 440
                : widthContent <= 768 && widthContent > 640
                ? 340
                : 640
            }
            height={
              widthContent === 1024 && widthContent > 768
                ? 380
                : widthContent === 768 && widthContent > 640
                ? 280
                : 580
            }
          />
        )}

        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="text-[--gray-800] capitalize">
              {product?.category
                .split("")
                .slice(0, product?.category?.length - 1)
                .join("") ?? "-"}
            </span>
            <h1 className="font-light text-[2rem] text-[--gray-800] mt-3 mb-1">
              {product?.name ?? "-"}
            </h1>
            <span className="font-semibold text-xl text-[--gray-1000]">
              {formatCentsToDollar(product?.price_in_cents as number)}
            </span>

            <p className="text-xs text-[--gray-800] mt-6">
              *Shipping costs US$40.00 throughout United State. Free for
              purchases over US$900.00.
            </p>

            <span className="font-medium uppercase mt-[3.625rem] mb-2">
              description
            </span>
            <p className="text-sm text-[--gray-800]">
              {product?.description ?? "-"}
            </p>
          </div>
          <button
            onClick={() => addItemToCart(product as ShoppingCartTypes)}
            className="hover:bg-[--blue-800] transition-all h-11 flex justify-center items-center gap-3 font-medium text-[--gray-200] bg-[--blue-700] uppercase rounded"
          >
            <ShoppingBagOpen size={16} weight="bold" />
            add to cart
          </button>
        </div>
      </div>
    </>
  );
}
