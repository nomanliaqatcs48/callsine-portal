import { useMediaQuery } from "react-responsive";

export const useCustomMediaQuery = () => {
  const isSm = useMediaQuery({ query: "(min-width: 576px)" });
  const isMd = useMediaQuery({ query: "(min-width: 768px)" });
  const isLg = useMediaQuery({ query: "(min-width: 992px)" });
  const isXl = useMediaQuery({ query: "(min-width: 1200px)" });
  const isXxl = useMediaQuery({ query: "(min-width: 1400px)" });

  const mediaQuery = (name: any) => {
    if (name === "xxl") {
      return isXxl;
    } else if (name === "xl") {
      return isXl;
    } else if (name === "lg") {
      return isLg;
    } else if (name === "md") {
      return isMd;
    } else if (name === "sm") {
      return isSm;
    } else {
      return name;
    }
  };

  return [mediaQuery];
};
