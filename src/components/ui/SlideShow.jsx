import { useState, useEffect } from "react";
import GenerateData from "../services/GenerateData";
import Review from "./Review";
import Dots from "./Dots";
import "../../styles/slideShow.scss";

export default function SlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState(null);
  const [reviewsToShow, setReviewsToShow] = useState(3); // default Desktop

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setReviewsToShow(1); // Tablet & Mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="slideshow">
      <GenerateData setData={setData} url="./data/reviews.json"/>
      <h2>Avis :</h2>

      {data ? (
        <>
          <div className="slideShow_container">
            <i
              className="fa-solid fa-chevron-left"
              onClick={() =>
                setCurrentIndex(
                  (prevIndex) =>
                    (prevIndex - reviewsToShow + data.length) % data.length
                )
              }
            ></i>

            {/* Render dynamically the right number of reviews */}
            {Array.from({ length: reviewsToShow }).map((_, i) => (
              <Review key={i} index={(currentIndex + i) % data.length} />
            ))}

            <i
              className="fa-solid fa-chevron-right"
              onClick={() =>
                setCurrentIndex(
                  (prevIndex) => (prevIndex + reviewsToShow) % data.length
                )
              }
            ></i>
          </div>

          <Dots
            currentIndex={currentIndex}
            dataLength={data.length}
            reviewsToShow={reviewsToShow}
          />
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </section>
  );
}
