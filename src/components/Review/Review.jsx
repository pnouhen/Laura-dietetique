import "./review.scss";

export default function Review({ review }) {
  return (
    <article className="review">
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
