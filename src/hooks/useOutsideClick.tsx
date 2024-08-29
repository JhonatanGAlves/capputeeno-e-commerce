import { MutableRefObject, useEffect } from "react";

export function useOutsideClick(
  ref: MutableRefObject<null>,
  hideFilter: () => void
) {
  const handleClick = (e: MouseEvent) => {
    if (
      ref.current &&
      !(ref.current as Element).contains(e.target as unknown as Node)
    ) {
      hideFilter();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}
