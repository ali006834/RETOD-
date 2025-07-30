import { useCallback, useEffect, useState } from "react";
import { point } from "src/styles/breakpoints";
import { useScreenResize } from "./useScreenResize";

export function useScreen() {
  const [width, setWidth] = useState(0);
  const handleResize = useCallback(() => {
    setWidth(() => innerWidth());
  }, []);
  useScreenResize(handleResize);

  useEffect(() => {
    setWidth(innerWidth());
  }, []);

  const innerWidth = () => {
    if (typeof window === "undefined") return 0;
    return window.innerWidth;
  };

  // sm: 540,
  // md: 720,
  // lg: 960,
  // xl: 1140,
  // xxl: 1320,

  return {
    width,
    isSmall: width < point.sm, // Küçük telefonlar                      => 0 - 540px
    isMobile: width < point.md, // Telefonlar                           => 0 - 540px
    isTablet: width >= point.md && width < point.lg, // Tabletler       => 541px - 960px
    isDesktop: width >= point.lg, // Web                                => 960px - +++
  };
}
