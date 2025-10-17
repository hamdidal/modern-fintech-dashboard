import { BREAKPOINTS } from "@constants";
import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return {
    isMobile: width <= BREAKPOINTS.mobile,
    isTablet: width <= BREAKPOINTS.tablet,
    isSmallLaptop: width <= BREAKPOINTS.smallLaptop,
    isLaptop: width <= BREAKPOINTS.laptop,
    isDesktop: width > BREAKPOINTS.desktop,
  };
};
