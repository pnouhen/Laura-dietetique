import { useState, useEffect, useRef } from "react";
import { fetchData } from "../../services/fetchData.jsx";
import { useDetectWidth } from "../../services/useDetectWidth.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import CardReview from "../CardReview/CardReview.jsx";
import Dots from "../Dots/Dots.jsx";
import NoData from "../NoData/NoData.jsx";

import "./reviews.scss";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const slideShowRef = useRef(null);

  useEffect(() => {
    fetchData("/public/data/reviews.json")
      .then((data) =>
        setReviews(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
      )
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const isDesktop = useDetectWidth();
  const visibleReviews = isDesktop ? 3 : 1;

  // Make sure index is valid when switching between desktop/mobile
  useEffect(() => {
    // Ensure index is always a multiple of visibleReviews on desktop
    if (isDesktop && index % visibleReviews !== 0) {
      setIndex(Math.floor(index / visibleReviews) * visibleReviews);
    }
  }, [isDesktop, visibleReviews, index]);

  // Calculate and set the maximum height needed for the container
  useEffect(() => {
    if (reviews.length > 0 && slideShowRef.current) {
      // Give the DOM time to render the reviews first
      const timer = setTimeout(() => {
        const reviewElements = slideShowRef.current.querySelectorAll(".review");
        let maxHeight = 0;

        reviewElements.forEach((el) => {
          // Get the height with all content expanded
          const reviewCopy = el.cloneNode(true);
          reviewCopy.style.position = "absolute";
          reviewCopy.style.visibility = "hidden";
          reviewCopy.style.height = "auto";

          // Make sure any "comment" elements inside are expanded
          const commentElement = reviewCopy.querySelector(".comment");
          if (commentElement) {
            commentElement.classList.add("active");
          }

          document.body.appendChild(reviewCopy);
          const fullHeight = reviewCopy.offsetHeight;
          document.body.removeChild(reviewCopy);

          maxHeight = Math.max(maxHeight, fullHeight);
        });

        // Add some padding to ensure we have enough space
        setContainerHeight(maxHeight + 20);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [reviews, isDesktop]);

  // Handle proper pagination
  const handleDotClick = (newIndex) => {
    // Make sure we don't exceed the limits
    const maxStartIndex = Math.max(0, reviews.length - visibleReviews);
    setIndex(Math.min(newIndex, maxStartIndex));
  };

  return (
    <section className="slideshow" ref={slideShowRef}>
      <h2>Les avis :</h2>

      {reviews.length > 0 ? (
        <>
          <div
            className="slideShow_container"
            style={{
              minHeight: containerHeight > 0 ? `${containerHeight}px` : "auto",
            }}
          >
            <Pagination
              setIndex={setIndex}
              index={index}
              visible={visibleReviews}
              data={reviews}
            />
            {Array.from({ length: visibleReviews }).map((_, i) => {
              const reviewIndex = index + i;
              // Only render if we have a review at this index
              return reviewIndex < reviews.length ? (
                <CardReview key={reviewIndex} review={reviews[reviewIndex]} />
              ) : null;
            })}
          </div>
          <Dots
            currentIndex={index}
            dataLength={reviews.length}
            reviewsToShow={visibleReviews}
            onDotClick={handleDotClick}
          />
        </>
      ) : (
        <NoData
          text="Pas d'avis disponibles"
          textClass="titleRecipesCards"
        />
      )}
    </section>
  );
}