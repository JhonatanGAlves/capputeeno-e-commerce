export function formatCentsToDollar(value: number): string {
  const formattedValue = value / 100;

  const formattedInDollar = formattedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "USD",
  });

  return formattedInDollar;
}
