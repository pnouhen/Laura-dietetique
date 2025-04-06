import { useState } from "react";
import GenerateReviews from "../pages/services/GenerateReviews";
import "../../styles/review.scss"

export default function Reviews({index}) {
  const [data, setData] = useState(null);
  return (
    // Fonctionne ici
    <article>
      <GenerateReviews setData={setData} />
      {data ? (
        <>
          <p className="name">{data[index].name}</p>
          <div className="ratings">
            {[1,2,3,4,5].map((starIndex) =>(
              <i
              key={starIndex}
              className={`fa-solid fa-star ${
                starIndex <= data[index].rating ? "active" : ""
              }`}
            ></i>
            ))}
          </div>
          <p className="comment">{data[index].comment}</p>
        </>
      ) : (
        <p> Chargement en cours...</p>
      )}
    </article>
  );
}

