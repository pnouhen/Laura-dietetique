import { useEffect, useState } from "react";

import "../../styles/slideShows.scss";

export default function SlideShows() {
  const [reviews, setReviews] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    fetch("/data/reviews.json")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <section className="reviews">
      <h2>Témoignages</h2>
      {reviews ? (
        <>
          <div className="reviews___container">
            <i
              className="fa-solid fa-chevron-left"
              onClick={() =>
                setCurrentIndex(
                  (index) => (index - 1 + reviews.length) % reviews.length
                )
              }
            ></i>
            <p className="name">{reviews[currentIndex].name}</p>
            <div className="ratings">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <i
                  key={starIndex}
                  className={`fa-solid fa-star ${
                    starIndex <= reviews[currentIndex].rating ? "active" : ""
                  }`}
                ></i>
              ))}
            </div>
            <p className="comment">{reviews[currentIndex].comment}</p>
            <i
              className="fa-solid fa-chevron-right"
              onClick={() =>
                setCurrentIndex((index) => (index + 1) % reviews.length)
              }
            ></i>
            <ul>
              {reviews.map((item, index) => (
                <li
                  key={index}
                  className={`${currentIndex === index ? "dotSelected" : ""}`}
                ></li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>Chargement...</div>
      )}
    </section>
  );
}
