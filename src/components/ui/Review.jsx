import { useState, useEffect, useRef } from "react";
import GenerateReviews from "../pages/services/GenerateReviews";
import "../../styles/review.scss";

export default function Reviews({ index }) {
  const [data, setData] = useState(null);
  const commentRefs = useRef([]); // Utilisation d'un tableau de refs
  const [maxHeight, setMaxHeight] = useState(0);

  // Met à jour la hauteur max automatiquement quand data ou index change
  useEffect(() => {
    if (data && commentRefs.current.length) {
      // Mesurer la hauteur de chaque commentaire et récupérer la plus grande
      const heights = commentRefs.current.map(
        (ref) => ref?.getBoundingClientRect().height || 0
      );
      const maxCommentHeight = Math.max(...heights);
      setMaxHeight(maxCommentHeight); // Mettre à jour la hauteur maximale
    }
  }, [data]);

  return (
    <article className="review" 
    ref={(el) => commentRefs.current[index] = el} // Affecte la ref dynamique par index
    style={{ minHeight: `${maxHeight - 82.5}px` }}>
      <GenerateReviews setData={setData} />

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

          <p
            className="comment"
          >
            {data[index].comment}
          </p>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </article>
  );
}
