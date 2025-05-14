import { useState } from "react";
import "./homeStarRating.scss";

export default function StarRating({ rating = 0, setRating = null, showLabel = true }) {
  const [hoverRating, setHoverRating] = useState(0);
  const editable = typeof setRating === "function";

  const RATING_TEXTS = [
    "Aucun avis",
    "Décevant",
    "Médiocre",
    "Moyen",
    "Bien",
    "Excellent",
  ];

  const current = hoverRating || rating;

  return (
    <div className="starRatings">
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={`fa-solid fa-star ${i < current ? "starSelected" : ""}`}
          onClick={editable ? () => setRating(i + 1) : undefined}
          onMouseEnter={editable ? () => setHoverRating(i + 1) : undefined}
          onMouseLeave={editable ? () => setHoverRating(0) : undefined}
          style={{ cursor: editable ? "pointer" : "default" }}
        ></i>
      ))}
      {showLabel && <p>{RATING_TEXTS[current]}</p>}
    </div>
  );
}
