import { useState, useEffect } from "react";
import { fetchData } from "../../service/FetchData";
import Review from "../Review/Review";
import Dots from "../Dots/Dots";
import "./slideShow.scss";

export default function SlideShow() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  // Fetch and sort reviews by date (newest first)
  useEffect(() => {
    fetchData("/public/data/reviews.json")
      .then((data) =>
        setReviews(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
      )
      .catch((error) => console.error("Error while fetching:", error));
  }, []);

  // Handler for navigation
  const handleNavigation = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <section className="slideshow">
      <h2>Les avis :</h2>
      {reviews.length > 0 ? (
        <>
          <div className="slideShow_container">
            {/* Left arrow */}
            <i
              className="fa-solid fa-chevron-left"
              onClick={() =>
                handleNavigation((index - 3 + reviews.length) % reviews.length)
              }
            ></i>

            {/* Render up to 3 reviews */}
            {[0, 1, 2].map((i) => {
              const review = reviews[index + i];
              return review ? <Review key={i} review={review} /> : null;
            })}

            {/* Right arrow */}
            <i
              className="fa-solid fa-chevron-right"
              onClick={() => handleNavigation((index + 3) % reviews.length)}
            ></i>
          </div>
          {/* Dots navigation */}
          <Dots
            currentIndex={index}
            dataLength={reviews.length}
            reviewsToShow={1}
            onDotClick={(newIndex) => handleNavigation(newIndex)}
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
