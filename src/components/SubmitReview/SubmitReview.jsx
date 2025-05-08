import { useState, useRef, useEffect } from "react";
import LabelInput from "../LabelInput/LabelInput";
import StarRating from "../StarRating/StarRating";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import MessageModal from "../MessageModal/MessageModal";

import "./submitReview.scss";

export default function SubmitReview() {
  // --- State management ---
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const MAX_CHARS = 450;

  // --- Form refs ---
  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const reviewRef = useRef();

  // --- Init character count on mount ---
  useEffect(() => {
    updateCharCounter();
  }, []);

  // --- Update character counter ---
  const updateCharCounter = () => {
    if (reviewRef.current) {
      setCharCount(reviewRef.current.value.length);
    }
  };

  // --- Handle form submission ---
  const handleSubmit = (event) => {
    event.preventDefault();

    const isEmpty =
      !lastNameRef.current.value ||
      !firstNameRef.current.value ||
      !reviewRef.current.value ||
      rating === 0;

    if (isEmpty) {
      setValidationError("Veuillez remplir tous les éléments");
      return;
    }

    setIsSubmitted(true);
    resetForm();
  };

  // --- Reset form fields and state ---
  const resetForm = () => {
    lastNameRef.current.value = "";
    firstNameRef.current.value = "";
    reviewRef.current.value = "";
    setRating(0);
    setCharCount(0);
    setValidationError(null);
  };

  // --- Close modal handlers ---
  const closeModal = (type) => {
    if (type === "success") setIsSubmitted(false);
    if (type === "validation") setValidationError(null);
  };

  // --- Calculate remaining characters ---
  const remainingChars = MAX_CHARS - charCount;

  return (
    <>
      <section className="submitReview">
        <h2>Laisser un avis :</h2>

        {/* Review Form */}
        <form onSubmit={handleSubmit}>
          <div className="NameFirstName">
          <LabelInput
            className="name"
            htmlFor="lastName"
            label="Nom"
            type="text"
            id="lastName"
            ref={lastNameRef}
          />
          <LabelInput
            className="firstName"
            htmlFor="firstName"
            label="Prénom"
            type="text"
            id="firstName"
            ref={firstNameRef}
          />
          </div>

          <StarRating rating={rating} setRating={setRating} />

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

          {/* Submit button (inside form for proper submission) */}
          <ButtonSubmit type="submit" />
        </form>
      </section>

      {/* Success modal */}
      {isSubmitted && (
        <MessageModal
          poster="message"
          title="Avis déposé"
          clickPoster={() => closeModal("success")}
          clickClose={() => closeModal("success")}
          message="Merci d'avoir partagé votre avis"
        />
      )}

      {/* Validation error modal */}
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
