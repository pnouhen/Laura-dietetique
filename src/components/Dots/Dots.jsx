import { useState, useEffect } from "react";
import "./dots.scss";

export default function Dots({ currentIndex, dataLength }) {
  // Calculate number of dots based on the number of reviews
  const [slideBy, setSlideBy] = useState(3);
  const [numberOfDots, setNumberOfDots] = useState(Math.ceil(dataLength / slideBy));
  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setNumberOfDots(dataLength);
        setSlideBy(1)
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <ul className="dots">
      {[...Array(numberOfDots)].map((_, index) => (
        <li
          key={index}
          className={index === Math.floor(currentIndex / slideBy) ? "active" : ""}
        />
      ))}
    </ul>
  );
}
