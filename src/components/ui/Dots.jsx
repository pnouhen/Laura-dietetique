import { useState } from "react";
import GenerateReviews from "../pages/services/GenerateReviews";

export default function Dots() {
  const [data, setData] = useState([]);
  const numberOfDots = Math.ceil(data.length / 3);
  return (
    <>
      <GenerateReviews setData={setData} />
      <ul>
        {[...Array(numberOfDots)].map((dot, index) => (
          <li
            key={index}
            className={index === dot ? "dot active" : "dot"}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </>
  );
}
