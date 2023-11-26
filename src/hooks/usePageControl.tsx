interface usePageControlProps {
  pageNumberList: { pageNumber: number }[];
}

export default function usePageControl(): usePageControlProps {
  // 60 is the total number of products that my API get if I don't pass in the query the filter "perPage".
  const pageNumbers = Number((60 / 12).toFixed()) - 1;

  let pageNumberList: { pageNumber: number }[] = [];

  for (let i = 1; i <= pageNumbers; i++) {
    pageNumberList.push({ pageNumber: i });
  }

  return { pageNumberList };
}
