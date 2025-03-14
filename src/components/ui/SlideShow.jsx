import { useEffect, useState, useRef } from "react";
import "../../styles/slideShows.scss";

export default function SlideShows() {
  const [reviews, setReviews] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

  // Référence pour chaque élément de commentaire
  const commentRefs = useRef([]);

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

  useEffect(() => {
    if (reviews) {
      // Mesurer la hauteur du commentaire le plus grand
      const heights = commentRefs.current.map(
        (ref) => ref?.getBoundingClientRect().height
      );
      const maxCommentHeight = Math.max(...heights);
      setMaxHeight(maxCommentHeight); // Mettre à jour la hauteur maximale
    }
  }, [reviews, currentIndex]);

  return (
    <section className="reviews" style={{ minHeight: `${maxHeight + 200}px` }}>
      <h2>Témoignages</h2>
      {reviews ? (
        <>
          <div className="nameRatingContainer">
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
          </div>
          <i
            className="fa-solid fa-chevron-left"
            onClick={() =>
              setCurrentIndex(
                (index) => (index - 1 + reviews.length) % reviews.length
              )
            }
          ></i>
          <p
            ref={(el) => (commentRefs.current[currentIndex] = el)}
            className="comment"
            style={{ minHeight: `${maxHeight}px` }}
          >
            {reviews[currentIndex].comment}
          </p>
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
        </>
      ) : (
        <div>Chargement...</div>
      )}
    </section>
  );
}
