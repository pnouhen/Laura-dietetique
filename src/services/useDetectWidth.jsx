import { useEffect, useState } from "react";

export function useDetectWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const isDesktop = width > 1024;

  return isDesktop;
}
