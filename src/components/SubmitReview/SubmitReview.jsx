import { useState, useRef, useEffect } from "react";
import MessageModal from "../MessageModal/MessageModal";
import "./submitReview.scss";

export default function SubmitReview() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 450;

  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const reviewRef = useRef();

  const RATING_TEXTS = [
    "Aucun avis",
    "Décevant",
    "Médiocre",
    "Moyen",
    "Bien",
    "Excellent",
  ];

  useEffect(() => {
    updateCharCounter();
  }, []);

  const updateCharCounter = () => {
    if (reviewRef.current) {
      const length = reviewRef.current.value.length;
      setCharCount(length);
    }
  };

  const handleSubmit = () => {
    if (
      !lastNameRef.current.value ||
      !firstNameRef.current.value ||
      !reviewRef.current.value ||
      rating === 0
    ) {
      setValidationError("Veuillez remplir tous les éléments");
      return;
    }
    setIsSubmitted(true);
    resetForm();
  };

  const resetForm = () => {
    lastNameRef.current.value = "";
    firstNameRef.current.value = "";
    reviewRef.current.value = "";
    setRating(0);
    setCharCount(0);
    setValidationError(null);
  };

  const closeModal = (type) => {
    if (type === "success") setIsSubmitted(false);
    if (type === "validation") setValidationError(null);
  };

  const remainingChars = MAX_CHARS - charCount;

  return (
    <>
    {/* Faire des composants et voir pour mettre des function */}
      <section className="submitReview">
        <h2>Laisser un avis :</h2>
        <form action="submit">
          <div className="name">
            <label htmlFor="lastname">Nom</label>
            <input type="text" id="lastname" ref={lastNameRef} />
          </div>
          <div className="firstName">
            <label htmlFor="firstname">Prénom</label>
            <input type="text" id="firstname" ref={firstNameRef} />
          </div>
          <div className="ratings">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={
                  i < (hoverRating || rating)
                    ? "fa-solid fa-star starSelected"
                    : "fa-solid fa-star"
                }
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
              ></i>
            ))}
            <p>{RATING_TEXTS[hoverRating || rating]}</p>
          </div>
          <div className="formReview">
            <label htmlFor="review">Votre avis</label>
            <span className="review-counter">
              Caractères restant : {remainingChars}
            </span>
            <textarea
              id="review"
              ref={reviewRef}
              onChange={updateCharCounter}
              maxLength={MAX_CHARS}
            />           
          </div>
        </form>
        <button onClick={handleSubmit}>Partagez</button>
      </section>

      {isSubmitted && (
        <MessageModal
          poster="message"
          title="Avis déposé"
          clickPoster={() => closeModal("success")}
          clickClose={() => closeModal("success")}
          message="Merci d'avoir partagé votre avis"
        />
      )}

      {validationError && (
        <MessageModal
          poster="message"
          title="Elément(s) manquant(s)"
          clickPoster={() => closeModal("validation")}
          clickClose={() => closeModal("validation")}
          message={validationError}
        />
      )}
    </>
  );
}
