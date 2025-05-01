import { useState, useEffect, useRef, createRef } from "react";
import { fetchData } from "../../service/FetchData";
import Review from "../Review/Review";
import Dots from "../Dots/Dots";
import "./slideShow.scss";

export default function SlideShow() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);               // Current starting index in the reviews list
  const [visible, setVisible] = useState(3);           // Number of reviews visible at once
  const [maxHeight, setMaxHeight] = useState(0);       // Max height among visible reviews
  const reviewRefs = useRef([]);                       // Refs for each visible review card

  // Fetch and sort reviews by date (newest first)
  useEffect(() => {
    fetchData("/public/data/reviews.json")
      .then((data) =>
        setReviews(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
      )
      .catch((error) => console.error("Error while fetching:", error));
  }, []);

  // Update number of visible reviews based on screen width
  useEffect(() => {
    const resize = () => setVisible(window.innerWidth <= 1024 ? 1 : 3);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Prepare refs for currently visible review cards
  useEffect(() => {
    // Keep only the required number of refs
    reviewRefs.current = reviewRefs.current.slice(0, visible);

    // Create new refs if necessary
    while (reviewRefs.current.length < visible) {
      reviewRefs.current.push(createRef());
    }
  }, [visible]);

  // Measure and update max height from visible reviews
  useEffect(() => {
    if (reviews.length > 0) {
      // Wait for the DOM to update before measuring
      setTimeout(() => {
        let maxH = 0;
        reviewRefs.current.forEach((ref) => {
          if (ref.current) {
            const height = ref.current.clientHeight;
            maxH = Math.max(maxH, height);
          }
        });
        if (maxH > 0) {
          setMaxHeight(maxH);
        }
      }, 100);
    }
  }, [reviews, index, visible]);

  return (
    <section className="slideshow">
      <h2>Reviews:</h2>
      {reviews.length > 0 ? (
        <>
          <div className="slideShow_container">
            {/* Left arrow navigation */}
            <i
              className="fa-solid fa-chevron-left"
              onClick={() =>
                setIndex((index - visible + reviews.length) % reviews.length)
              }
            ></i>

            {/* Render visible review cards */}
            {Array.from({ length: visible }).map((_, i) => {
              const current = (index + i) % reviews.length;
              return (
                <Review
                  key={current}
                  review={reviews[current]}
                  innerRef={reviewRefs.current[i]} // Pass ref to measure height
                  maxHeight={maxHeight}            // Pass max height to normalize size
                />
              );
            })}

            {/* Right arrow navigation */}
            <i
              className="fa-solid fa-chevron-right"
              onClick={() => setIndex((index + visible) % reviews.length)}
            ></i>
          </div>

          {/* Dots navigation */}
          <Dots
            currentIndex={index}
            dataLength={reviews.length}
            reviewsToShow={visible}
          />
        </>
      ) : (
        <div className="error-container dataNull">
          <p>No reviews available at the moment.</p>
        </div>
      )}
    </section>
  );
}
