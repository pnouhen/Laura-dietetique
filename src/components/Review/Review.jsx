import "./review.scss";

export default function Review({ review, innerRef, maxHeight }) {
  return (
    <article 
      className="review" 
      ref={innerRef}  // Set the ref to link this component with the parent (SlideShow)
      style={maxHeight ? { height: `${maxHeight}px` } : {}}  // Set height to match the tallest review if provided
    >
      {/* Display reviewer's name */}
      <p className="name">{review.name}</p>

      {/* Render star ratings dynamically based on the review rating */}
      <div className="ratings">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <i
            key={starIndex}
            className={`fa-solid fa-star ${  // Add the 'starSelected' class for selected stars
              starIndex <= Number(review.rating) ? "starSelected" : ""
            }`}
          ></i>
        ))}
      </div>

      {/* Display the review comment */}
      <p className="comment">{review.comment}</p>
    </article>
  );
}
