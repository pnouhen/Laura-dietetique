import { useState, useEffect, useRef } from "react";
import HomeStarRating from "../Home-StarRating/HomeStarRating";
import HomeReviewCardButtonMore from "../Home-ReviewCard-ButtonMore/HomeReviewCardButtonMore";

import "./homeReviewCard.scss"

export default function CardsReview({ review }) {
  const [clickButtonMore, setClickButtonMore] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const commentRef = useRef(null);

  // Vérifie si le texte dépasse la hauteur du conteneur
  useEffect(() => {
    if (commentRef.current) {
      const isOverflowing = commentRef.current.scrollHeight > commentRef.current.clientHeight;
      setShowButton(isOverflowing);
    }
  }, [review.comment]);

  return (
    <article className="review">
      {/* Display reviewer's name */}
      <p className="name">{review.name}</p>

      {/* Render star ratings */}
      <HomeStarRating rating={Number(review.rating)} showLabel={false} />
      {/* Container with fixed height for the comment */}
      <div className="comment-container">
        <p
          ref={commentRef}
          className={clickButtonMore ? "comment active" : "comment"}
        >
          {review.comment}
        </p>

        {showButton && (
          <HomeReviewCardButtonMore
            text={clickButtonMore ? "Réduire" : "Afficher plus"}
            onClick={() => setClickButtonMore(!clickButtonMore)}
          />
        )}
      </div>
    </article>
  );
}