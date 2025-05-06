import { useEffect, useState } from "react";

export function useDetectWidth(responsivePX) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const isDesktop = width > responsivePX;

  return isDesktop;
}
