import { useEffect, useRef, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const { current: isGet } = useRef<{ width: boolean; height: boolean }>({
    height: false,
    width: false,
  });

  useEffect(() => {
    const handleResize = () => {
      if (isGet.width) setWidth(window.innerWidth);
      if (isGet.height) setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return Object.defineProperties(
    {},
    {
      width: {
        get: () => {
          isGet.width = true;
          return width;
        },
      },
      height: {
        get: () => {
          isGet.height = true;
          return height;
        },
      },
    }
  ) as { height: number; width: number };
};
