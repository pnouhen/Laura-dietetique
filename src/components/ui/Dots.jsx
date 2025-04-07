import { useState } from "react";
import GenerateReviews from "../pages/services/GenerateReviews";
import "../../styles/dots.scss"

export default function Dots() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Index actif
  const numberOfDots = Math.ceil(data.length / 3);

  return (
    <>
      <GenerateReviews setData={setData} />
      <ul className="dots">
        {[...Array(numberOfDots)].map((_, index) => (
          <li
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)} // clique pour changer l'actif
          />
        ))}
      </ul>
    </>
  );
}
