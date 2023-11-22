import { MutableRefObject, useEffect } from "react";

export function useOutsideClick(
  ref: MutableRefObject<null>,
  hideFilter: () => void
) {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target)) {
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
