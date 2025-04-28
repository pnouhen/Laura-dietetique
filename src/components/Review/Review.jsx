import { forwardRef } from "react";
import "./review.scss";

const Review = forwardRef(({ review, uniformHeight }, ref) => {
  if (!review) return null;

  return (
    <article
      className="review"
      ref={ref}
      style={{ minHeight: uniformHeight ? `${uniformHeight}px` : "auto" }}
    >
      <p className="name">{review.name}</p>

      <div className="ratings">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <i
            key={starIndex}
            className={`fa-solid fa-star ${
              starIndex <= Number(review.rating) ? "starSelected" : ""
            }`}
          ></i>
        ))}
      </div>

      <p className="comment">{review.comment}</p>
    </article>
  );
});

export default Review;
