import { useState, useEffect, useRef } from "react";
import { fetchData } from "../../services/fetchData.jsx";
import { useDetectWidth } from "../../services/useDetectWidth.jsx";
import CardReview from "../CardReview/CardReview.jsx";
import Dots from "../Dots/Dots.jsx";
import NoData from "../NoData/NoData.jsx";

import "./reviews.scss";

// Voir responsive + changement du nombre de carte

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const reviewsRef = useRef(null);

  useEffect(() => {
    fetchData("/public/data/reviews.json")
      .then((data) =>
        setReviews(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
      )
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const isDesktop = useDetectWidth(1024);
  const visibleCardReview = isDesktop ? 3 : 1;

  // Make sure index is valid when switching between desktop/mobile
  useEffect(() => {
    // Ensure index is always a multiple of visibleCardReview on desktop
    if (isDesktop && index % visibleCardReview !== 0) {
      setIndex(Math.floor(index / visibleCardReview) * visibleCardReview);
    }
  }, [isDesktop, visibleCardReview, index]);

  // Calculate and set the maximum height needed for the container
  useEffect(() => {
    if (reviews.length > 0 && reviewsRef.current) {
      // Give the DOM time to render the reviews first
      const timer = setTimeout(() => {
        const reviewElements = reviewsRef.current.querySelectorAll(".review");
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
    const maxStartIndex = Math.max(0, reviews.length - visibleCardReview);
    setIndex(Math.min(newIndex, maxStartIndex));
  };

  // Pagination
  const handlePrev = () =>
    setIndex((index - visibleCardReview + reviews.length) % reviews.length);
  const handleNext = () => setIndex((index + visibleCardReview) % reviews.length);

  return (
    <section className="reviews" ref={reviewsRef}>
      <h2>Les avis :</h2>

      {reviews.length > 0 ? (
        <>
          <div
            className="reviews_container"
            style={{
              minHeight: containerHeight > 0 ? `${containerHeight}px` : "auto",
            }}
          >
            <i className="fa-solid fa-chevron-left" onClick={handlePrev}></i>
            {Array.from({ length: visibleCardReview }).map((_, i) => {
              const reviewIndex = index + i;
              // Only render if we have a review at this index
              return reviewIndex < reviews.length ? (
                <CardReview key={reviewIndex} review={reviews[reviewIndex]} />
              ) : null;
            })}
            <i className="fa-solid fa-chevron-right" onClick={handleNext}></i>
          </div>
          <Dots
            currentIndex={index}
            dataLength={reviews.length}
            reviewsToShow={visibleCardReview}
            onDotClick={handleDotClick}
          />
        </>
      ) : (
        <NoData text="Pas d'avis disponibles" textClass="titleRecipesCards" />
      )}
    </section>
  );
}
