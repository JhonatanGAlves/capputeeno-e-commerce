"use client";
import { useContext } from "react";

import Link from "next/link";

import { MagnifyingGlass, ShoppingBagOpen } from "@phosphor-icons/react";

import { FilterContext } from "@/context/FilterContext";
import { CapputeenoContext } from "@/context/CapputeenoContext";

export default function Header() {
  const { inputTxt, setInputTxt } = useContext(FilterContext);
  const { countCart, setShowNotificationAlert } = useContext(CapputeenoContext);

  const responsivePadding =
    "px-4 min-[920px]:px-10 min-[980px]:px-20 min-[1140px]:px-40";

  return (
    <header
      className={`flex flex-col min-[664px]:flex-row min-[664px]:justify-between items-center ${responsivePadding} py-[1.1875rem] gap-3 bg-[--white]`}
    >
      <Link
        href={"/"}
        className="font-sans font-normal text-[2.5rem] text-[--gray-700]"
      >
        capputeeno
      </Link>
      <div className="flex items-center gap-6">
        <div className="flex justify-between items-center w-full min-[385px]:w-72 min-[445px]:w-[22rem] px-4 py-2.5 bg-[--gray-200] rounded-lg">
          <input
            className="w-full bg-transparent outline-none placeholder:text-[--base-placeholder] text-sm"
            type="search"
            value={inputTxt}
            onChange={(e) => setInputTxt(e.target.value)}
            placeholder="Looking for something specific?"
          />
          <MagnifyingGlass className="ml-4" size={22} />
        </div>
        <div className="relative">
          <Link
            href={"/shopping-cart"}
            onClick={() =>
              setShowNotificationAlert({
                message: "",
                showAlert: false,
                description: "",
              })
            }
          >
            <ShoppingBagOpen size={26} />
          </Link>
          <span
            className={`${
              !countCart && "hidden"
            } flex justify-center items-center absolute -bottom-[6px] -right-[7px] w-[17px] h-[17px] rounded-full text-[#FFFFFF] font-medium text-[0.625rem] bg-[--red-700]`}
          >
            {countCart}
          </span>
        </div>
      </div>
    </header>
  );
}
