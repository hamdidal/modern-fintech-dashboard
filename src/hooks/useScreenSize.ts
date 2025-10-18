import { BREAKPOINTS } from "@constants";
import { useEffect, useState, useCallback } from "react";

export const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const debouncedHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleWindowSizeChange, 150);
    };

    window.addEventListener("resize", debouncedHandler);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedHandler);
    };
  }, [handleWindowSizeChange]);

  return {
    isMobile: width <= BREAKPOINTS.mobile,
    isTablet: width <= BREAKPOINTS.tablet,
    isSmallLaptop: width <= BREAKPOINTS.smallLaptop,
    isLaptop: width <= BREAKPOINTS.laptop,
    isDesktop: width > BREAKPOINTS.desktop,
  };
};
