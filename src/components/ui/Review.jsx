import { useEffect, useRef, useState } from "react";
import "../../styles/review.scss";

export default function Review({ review, index }) {
  const commentRefs = useRef([]);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const height = commentRefs.current[index]?.getBoundingClientRect().height || 0;
      setMaxHeight(height);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [review, index]);

  if (!review) return <p>Loading...</p>;

  return (
    <article
      className="review"
      ref={(el) => (commentRefs.current[index] = el)}
      style={{ minHeight: `${maxHeight}px` }}
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
}
