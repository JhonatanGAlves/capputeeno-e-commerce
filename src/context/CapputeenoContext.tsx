"use client";
import { useEffect, useState, useMemo, createContext, ReactNode } from "react";

interface CapputeenoContextProps {
  shoppingCart: ShoppingCartTypes[];
  addItemToCart: (value: ShoppingCartTypes) => void;
  countCart: number;
  countTotalPrice: number;
  updateItemFromCart: (
    id: string,
    operation?: "DEC" | "INC",
    value?: number
  ) => void;
}

interface CapputeenoContextProviderProps {
  children: ReactNode;
}

export const CapputeenoContext = createContext<CapputeenoContextProps>(
  {} as CapputeenoContextProps
);

export default function CapputeenoContextProvider({
  children,
}: CapputeenoContextProviderProps) {
  let getShoppingCartFromStorage = [];

  if (typeof window !== "undefined") {
    getShoppingCartFromStorage =
      JSON.parse(localStorage.getItem("cart") || "[]").length > 0
        ? JSON.parse(localStorage.getItem("cart") || "[]")
        : [];
  }

  const [shoppingCart, setShoppingCart] = useState<ShoppingCartTypes[]>(
    getShoppingCartFromStorage
  );
  const [countCart, setCountCart] = useState<number>(0);
  const [countTotalPrice, setCountTotalPrice] = useState<number>(0);

  function addItemToCart(newShoppingCart: ShoppingCartTypes) {
    const itemAlreadyExistInTheCart = shoppingCart.some(
      (item) => item.id === newShoppingCart?.id
    );

    if (itemAlreadyExistInTheCart) {
      const currentShoppingCart = [...shoppingCart];

      const updatedItem = currentShoppingCart.map((item) =>
        item.id === newShoppingCart?.id
          ? {
              ...item,
              totalPrice: (item.totalPrice += item.price_in_cents),
              unit: (item.unit += 1),
            }
          : { ...item }
      );

      setShoppingCart(updatedItem);
      localStorage.setItem("cart", JSON.stringify(updatedItem));
    } else {
      const newItem = {
        ...newShoppingCart,
        totalPrice: newShoppingCart.price_in_cents,
        unit: 1,
      };

      setShoppingCart([...shoppingCart, newItem]);
      localStorage.setItem("cart", JSON.stringify([...shoppingCart, newItem]));
    }
  }

  function updateItemFromCart(
    id: string,
    operation?: "DEC" | "INC",
    value?: number
  ) {
    const updatedItem = shoppingCart.map((item) =>
      item.id === id
        ? {
            ...item,
            totalPrice:
              operation === "DEC"
                ? (item.totalPrice -= item.price_in_cents)
                : operation === "INC"
                ? (item.totalPrice += item.price_in_cents)
                : item.totalPrice * (value as number),
            unit: (operation === "DEC"
              ? (item.unit -= 1)
              : operation === "INC"
              ? (item.unit += 1)
              : value) as number,
          }
        : { ...item }
    );

    setShoppingCart(updatedItem);
    localStorage.setItem("cart", JSON.stringify(updatedItem));
  }

  useEffect(() => {
    const totalUnit = shoppingCart.map((item) => item.unit);
    const sumUnit = totalUnit.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    const totalPrice = shoppingCart.map((item) => item.totalPrice);
    const sumTotalPrice = totalPrice.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    setCountTotalPrice(sumTotalPrice);
    setCountCart(sumUnit);
  }, [shoppingCart]);

  const values = useMemo(() => {
    return {
      shoppingCart,
      addItemToCart,
      countCart,
      countTotalPrice,
      updateItemFromCart,
    };
  }, [shoppingCart, countCart]);

  return (
    <CapputeenoContext.Provider value={values}>
      {children}
    </CapputeenoContext.Provider>
  );
}
