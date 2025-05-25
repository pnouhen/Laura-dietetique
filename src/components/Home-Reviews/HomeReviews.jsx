import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData.jsx";
import { useDetectWidth } from "../../services/useDetectWidth.jsx";
import HomeReviewCard from "../Home-ReviewCard/HomeReviewCard.jsx";
import HomeReviewDots from "../Home-Review-Dots/HomeReviewDots.jsx";
import NoData from "../NoData/NoData.jsx";

import "./homeReviews.scss";

// Voir responsive + changement du nombre de carte

export default function HomeReviews() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchData("/data/reviews.json")
      .then((data) =>
        setReviews(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
      )
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const isDesktop = useDetectWidth(1024);
  const visibleCardReview = isDesktop ? 3 : 1;

  // Pagination
  const handlePrev = () =>
    setIndex((index - visibleCardReview + reviews.length) % reviews.length);
  const handleNext = () =>
    setIndex((index + visibleCardReview) % reviews.length);

  return (
    <section className="reviews">
      <h2>Les avis :</h2>

      {reviews.length > 0 ? (
        <>
          <div className="reviews_container">
            <i className="fa-solid fa-chevron-left" onClick={handlePrev}></i>
            {Array.from({ length: visibleCardReview }).map((_, i) => {
              const reviewIndex = index + i;
              // Only render if we have a review at this index
              return reviewIndex < reviews.length ? (
                <HomeReviewCard
                  key={reviewIndex}
                  review={reviews[reviewIndex]}
                />
              ) : null;
            })}
            <i className="fa-solid fa-chevron-right" onClick={handleNext}></i>
          </div>
          <HomeReviewDots
            currentIndex={index}
            dataLength={reviews.length}
            reviewsToShow={visibleCardReview}
          />
        </>
      ) : (
        <NoData text="Pas d'avis disponibles" textClass="titleRecipesCards" />
      )}
    </section>
  );
}
