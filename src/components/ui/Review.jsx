import { useState, useEffect, useRef } from "react";
import GenerateData from "../services/GenerateData";
import "../../styles/review.scss";

export default function Reviews({ index }) {
  const [data, setData] = useState(null);
  const commentRefs = useRef([]); // Using an array of refs
  const [maxHeight, setMaxHeight] = useState(0);

  // Updates the max height automatically when 'data' or 'index' changes
  useEffect(() => {
    if (data) {
      // Waiting for the DOM elements to be fully rendered
      const timeoutId = setTimeout(() => {
        if (commentRefs.current[index]) {
          // Measure the height of the current comment element
          const commentHeight = commentRefs.current[index]?.getBoundingClientRect().height || 0;
          setMaxHeight(commentHeight); // Update the max height value
        }
      }, 100); // Small delay to ensure elements are rendered
      return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount or update
    }
  }, [data, index]); // Run this effect when 'data' or 'index' changes

  return (
    <article
      className="review"
      ref={(el) => commentRefs.current[index] = el} // Assign the ref dynamically by index
      style={{ minHeight: `${maxHeight}px` }} // Apply the adjusted max height
    >
      <GenerateData setData={setData} url="./data/reviews.json" />

      {data ? (
        <>
          <p className="name">{data[index].name}</p>

          <div className="ratings">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <i
                key={starIndex}
                className={`fa-solid fa-star ${
                  starIndex <= data[index].rating ? "starSelected" : ""
                }`}
              ></i>
            ))}
          </div>

          <p className="comment">
            {data[index].comment}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </article>
  );
}
