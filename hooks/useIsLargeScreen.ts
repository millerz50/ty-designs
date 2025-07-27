import { useEffect, useState } from "react";

export const useIsLargeScreen = (minWidth = 640): boolean => {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsLarge(window.innerWidth >= minWidth);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [minWidth]);

  return isLarge;
};
