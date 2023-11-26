import { SetStateAction } from "react";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";

import usePageControl from "@/hooks/usePageControl";

interface PageControlProps {
  page: number;
  setPage: (page: SetStateAction<number>) => void;
}

export default function PageControl({ page, setPage }: PageControlProps) {
  const { pageNumberList } = usePageControl();

  function handlePageChange(currentPage: number, goTo: "previous" | "next") {
    if (goTo === "previous" && currentPage > 0) {
      setPage(currentPage - 1);
    }

    if (goTo === "next" && currentPage < pageNumberList.length - 1) {
      setPage(currentPage + 1);
    }
  }

  return (
    <div className="flex gap-0.5">
      {pageNumberList.map((p, index) => (
        <button
          key={index}
          className={`flex justify-center items-center w-8 h-8 rounded-lg border border-solid ${
            page === index
              ? "border-[--orange-400] bg-[--gray-200]"
              : "border-transparent bg-[--gray-300]"
          } outline-none`}
          onClick={() => setPage(index)}
        >
          <span
            className={`${
              page === index
                ? "font-semibold text-[--orange-400]"
                : "text-[--base-text]"
            }`}
          >
            {p.pageNumber}
          </span>
        </button>
      ))}
      <button
        className={`ml-1.5 flex justify-center items-center w-8 h-8 rounded-lg border border-solid border-transparent bg-[--gray-300] outline-none`}
        onClick={() => handlePageChange(page, "previous")}
      >
        <CaretLeft size={16} weight="bold" />
      </button>
      <button
        className={`flex justify-center items-center w-8 h-8 rounded-lg border border-solid border-transparent bg-[--gray-300] outline-none`}
        onClick={() => handlePageChange(page, "next")}
      >
        <CaretRight size={16} weight="bold" />
      </button>
    </div>
  );
}
