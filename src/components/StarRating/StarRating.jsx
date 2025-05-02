import { useState } from "react";
import "./starRating.scss";

export default function StarRating({ rating, setRating }) {
  const [hoverRating, setHoverRating] = useState(0);

  // Text labels for each rating level
  const RATING_TEXTS = [
    "Aucun avis",
    "Décevant",
    "Médiocre",
    "Moyen",
    "Bien",
    "Excellent",
  ];

  return (
    <div className="starRatings">
      {/* Render 5 stars */}
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={
            i < (hoverRating || rating)
              ? "fa-solid fa-star starSelected"
              : "fa-solid fa-star"
          }
          onClick={() => setRating(i + 1)}         // Set selected rating
          onMouseEnter={() => setHoverRating(i + 1)} // Highlight on hover
          onMouseLeave={() => setHoverRating(0)}     // Reset on mouse leave
        ></i>
      ))}

      {/* Display label under stars */}
      <p>{RATING_TEXTS[hoverRating || rating]}</p>
    </div>
  );
}
