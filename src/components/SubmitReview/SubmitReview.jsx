import { useState, useRef } from "react";
import MessageModal from "../MessageModal/MessageModal";
import "./submitReview.scss";

export default function SubmitReview() {
  // Change rating's color and text
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const ratingsText = [
    "Aucun avis",
    "Décevant",
    "Médiocre",
    "Moyen",
    "Bien",
    "Excellent",
  ];

  // Inputs and textarea
  const [send, setSend] = useState(false);
  const [missingElement, setMissingElement] = useState(null);

  // Input refs
  const lastNameRef = useRef();
  const firstnameRef = useRef();
  const reviewRef = useRef();

  // Handle review submission
  const resetReview = () => {
    // Check if fields are filled
    if (
      !lastNameRef.current.value ||
      !firstnameRef.current.value ||
      !reviewRef.current.value ||
      rating === 0
    ) {
      // If not filled, show error message
      return setMissingElement("Veuillez remplir tous les éléments");
    }

    // If all fields are filled, clean inputs and submit the review
    setSend(true);
    lastNameRef.current.value = "";
    firstnameRef.current.value = "";
    reviewRef.current.value = "";
    setRating(0);
    setMissingElement(null); // Reset error message
  };

  return (
    <>
      <section className="submitReview">
        <h2>Laisser un avis :</h2>
        <form action="submit">
          <div className="name">
            <label htmlFor="lastname">Nom</label>
            <input type="text" id="lastname" ref={lastNameRef} />
          </div>
          <div className="firstName">
            <label htmlFor="firstname">Prénom</label>
            <input type="text" id="firstname" ref={firstnameRef} />
          </div>
          <div className="ratings">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={
                  index < (hoverRating || rating)
                    ? "fa-solid fa-star  starSelected"
                    : "fa-solid fa-star"
                }
                onClick={() => setRating(index + 1)}
                onMouseEnter={() => setHoverRating(index + 1)}
                onMouseLeave={() => setHoverRating(0)}
              ></i>
            ))}
            <p>{ratingsText[hoverRating || rating]}</p>
          </div>
          <div className="formReview">
            <label htmlFor="review">Votre avis</label>
            <textarea id="review" ref={reviewRef}></textarea>
          </div>
        </form>
        <button onClick={resetReview}>Partagez</button>
      </section>

      {send && (
        <MessageModal
          poster={"message"}
          title={"Avis déposé"}
          clickPoster={() => setSend(false)}
          clickClose={() => setSend(false)}
          message={"Merci d'avoir partagé votre avis"}
        />
      )}
      {missingElement && (
        <MessageModal
          poster={"message"}
          title={"Elément(s) manquant(s)"}
          clickPoster={() => setMissingElement(null)}
          clickClose={() => setMissingElement(null)}
          message={missingElement}
        />
      )}
    </>
  );
}
