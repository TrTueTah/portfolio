import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateSizes(
  isSmall: boolean,
  isMobile: boolean,
  isTablet: boolean
) {
  return {
    macbookScale: isSmall ? 0.12 : isMobile ? 0.14 : isTablet ? 0.22 : 0.28,
    // Position of the MacBook's screen center
    macbookPosition: isSmall
      ? [0, -1.2, -6]
      : isMobile
        ? [0, -1.2, -6]
        : isTablet
          ? [0, -0.8, -6]
          : [0, -0.5, -6],
    rubikCubePosition: isSmall
      ? [4, -5, 0]
      : isMobile
        ? [5, -5, 0]
        : isTablet
          ? [5, -5, 0]
          : [9, -5.5, 0],
    reactLogoPosition: isSmall
      ? [3, 3, 0]
      : isMobile
        ? [5, 3, 0]
        : isTablet
          ? [5, 3, 0]
          : [8, 1, 0],
    nestLogoPosition: isSmall
      ? [-5, 0, 0]
      : isMobile
        ? [-6, 0, 0]
        : isTablet
          ? [-7, 0, 0]
          : [-8, 0, 0],
    golangLogoPosition: isSmall
      ? [-5, -10, -10]
      : isMobile
        ? [-9, -10, -10]
        : isTablet
          ? [-11, -7, -10]
          : [-13, -13, -10],
  };
}
