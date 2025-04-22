import { useState, useEffect, useRef } from "react";
import GenerateData from "../services/GenerateData";
import Review from "./Review";
import Dots from "./Dots";
import "../../styles/slideShow.scss";

export default function SlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState(null);
  const [reviewsToShow, setReviewsToShow] = useState(3); // default Desktop
  const [maxHeight, setMaxHeight] = useState(null);
  const reviewRefs = useRef([]);

  let sortedData = [];
  if (data) {
    sortedData = [...data].sort((a, b) => b.id - a.id);
  }

  useEffect(() => {
    const handleResize = () => {
      setReviewsToShow(window.innerWidth <= 1024 ? 1 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calcul de la hauteur max
  useEffect(() => {
    if (!data) return;
    const heights = reviewRefs.current.map((ref) => ref?.scrollHeight || 0);
    const max = Math.max(...heights);
    setMaxHeight(max);
  }, [data, reviewsToShow]);

  return (
    <section className="slideshow">
      <GenerateData setData={setData} url="./data/reviews.json" />
      <h2>Avis :</h2>

      {data ? (
        <>
          <div className="slideShow_container">
            <i
              className="fa-solid fa-chevron-left"
              onClick={() =>
                setCurrentIndex(
                  (prevIndex) =>
                    (prevIndex - reviewsToShow + sortedData.length) %
                    sortedData.length
                )
              }
            ></i>

            {Array.from({ length: reviewsToShow }).map((_, i) => {
              const reviewIndex = (currentIndex + i) % sortedData.length;
              return (
                <Review
                  key={i}
                  review={sortedData[reviewIndex]}
                  ref={(el) => (reviewRefs.current[i] = el)}
                  uniformHeight={maxHeight}
                />
              );
            })}

            <i
              className="fa-solid fa-chevron-right"
              onClick={() =>
                setCurrentIndex(
                  (prevIndex) =>
                    (prevIndex + reviewsToShow) % sortedData.length
                )
              }
            ></i>
          </div>

          <Dots
            currentIndex={currentIndex}
            dataLength={sortedData.length}
            reviewsToShow={reviewsToShow}
          />
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </section>
  );
}
