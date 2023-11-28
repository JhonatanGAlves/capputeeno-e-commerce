"use client";
import { useContext } from "react";

import Link from "next/link";
import { ArrowUUpLeft } from "@phosphor-icons/react";

import { CapputeenoContext } from "@/context/CapputeenoContext";
import { formatCentsToDollar } from "@/utils/utils";
import ProductCartCard from "@/components/product/ProductCartCard";

export default function ShoppingCartPage() {
  const { countCart, countTotalPrice, shoppingCart, updateItemFromCart } =
    useContext(CapputeenoContext);

  const responsivePadding =
    "px-4 min-[920px]:px-10 min-[980px]:px-20 min-[1140px]:px-40";

  const deliveryFee = 1500;

  return (
    <main
      className={`flex gap-8 ${responsivePadding} pt-[2.125rem] pb-[3.75rem]`}
    >
      <div className="flex flex-col">
        <Link href={"/"} className="flex items-center gap-2 w-fit">
          <div className=" rounded-full border-[2px] border-solid border-[--gray-500] flex justify-center items-center p-[0.28125rem]">
            <ArrowUUpLeft size={16} weight="bold" color="var(--gray-500)" />
          </div>
          <span className="font-medium text-sm text-[--gray-500]">Back</span>
        </Link>
        <h1 className="font-medium text-2xl text-[--gray-800] mt-[1.375rem] mb-1.5 uppercase">
          your cart
        </h1>
        <span className="font-light text-[--gray-800] mb-6">
          {`Total (${countCart} ${countCart > 1 ? "products" : "product"})`}{" "}
          <b className="font-semibold">
            {formatCentsToDollar(countTotalPrice)}
          </b>
        </span>

        <div className="flex flex-col gap-4">
          {shoppingCart.map((item, index) => (
            <ProductCartCard
              key={item.id}
              index={index}
              updateItemFromCart={updateItemFromCart}
              {...item}
            />
          ))}
        </div>
      </div>

      <aside className="flex flex-col justify-between px-6 py-4 bg-[--white]">
        <div className="flex flex-col text-[--gray-800]">
          <h1 className="font-semibold text-xl uppercase">order summary</h1>
          <div className="flex justify-between items-center mt-7">
            <span>Product subtotal</span>
            <span>{formatCentsToDollar(countTotalPrice)}</span>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span>Delivery fee</span>
            <span>{formatCentsToDollar(deliveryFee)}</span>
          </div>
          <div className="flex justify-between items-center font-semibold mt-6 pt-2 border-t border-solid border-[--gray-400]">
            <span>Total</span>
            <span>{formatCentsToDollar(countTotalPrice + deliveryFee)}</span>
          </div>
        </div>

        <button className="w-[19rem] h-11 mt-10 flex justify-center items-center font-medium text-[--gray-200] uppercase bg-[--green-700] rounded">
          checkout
        </button>
      </aside>
    </main>
  );
}