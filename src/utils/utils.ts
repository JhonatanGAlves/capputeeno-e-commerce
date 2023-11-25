import { SortByTypes, TabTypes } from "@/types/filter-types";

export function formatCentsToDollar(value: number): string {
  const formattedValue = value / 100;

  const formattedInDollar = formattedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "USD",
  });

  return formattedInDollar;
}

function formatSelectedValue(value: TabTypes | SortByTypes): string {
  switch (value) {
    case TabTypes.MUG:
      return "mugs";
    case TabTypes.SHIRT:
      return "t-shirts";
    case SortByTypes.NEWS:
      return "created_at";
    case SortByTypes.BIGGEST:
      return "price_in_cents";
    case SortByTypes.SMALLEST:
      return "price_in_cents";
    case SortByTypes.BEST_SELLER:
      return "sales";
    default:
      return value;
  }
}

export function mountQueryFilter(
  selectedTab: TabTypes,
  sortedBy: SortByTypes
): string {
  const isAscOrder = sortedBy === SortByTypes.SMALLEST;

  if (selectedTab !== TabTypes.ALL) {
    return `(filter: {category: "${formatSelectedValue(
      selectedTab
    )}"}, sortField: "${formatSelectedValue(sortedBy)}", sortOrder: "${
      isAscOrder ? "ASC" : "DSC"
    }")`;
  }

  return `(sortField: "${formatSelectedValue(sortedBy)}", sortOrder: "${
    isAscOrder ? "ASC" : "DSC"
  }")`;
}
