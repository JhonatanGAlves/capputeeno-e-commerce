import { TabTypes } from "@/types/filter-types";

export function formatCentsToDollar(value: number): string {
  const formattedValue = value / 100;

  const formattedInDollar = formattedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "USD",
  });

  return formattedInDollar;
}

export function formatSelectedTab(value: string): string {
  if (value === TabTypes.MUG) {
    return "mugs";
  }

  return "t-shirts";
}
