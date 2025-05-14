import { useState, useRef, useEffect } from "react";
import LabelInput from "../LabelInput/LabelInput";
import StarRating from "../StarRating/StarRating";
import Button from "../Button/Button";

import "./submitReview.scss";

export default function SubmitReview({ onSuccess, onValidationError }) {
  const [rating, setRating] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 450;

  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const reviewRef = useRef();

  useEffect(() => {
    updateCharCounter();
  }, []);

  const updateCharCounter = () => {
    if (reviewRef.current) {
      setCharCount(reviewRef.current.value.length);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isEmpty =
      !lastNameRef.current.value ||
      !firstNameRef.current.value ||
      !reviewRef.current.value ||
      rating === 0;

    if (isEmpty) {
      onValidationError("Veuillez remplir tous les éléments");
      return;
    }

    onSuccess();
    resetForm();
  };

  const resetForm = () => {
    lastNameRef.current.value = "";
    firstNameRef.current.value = "";
    reviewRef.current.value = "";
    setRating(0);
    setCharCount(0);
  };

  const remainingChars = MAX_CHARS - charCount;

  return (
    <section className="submitReview">
      <h2>Laisser un avis :</h2>
      <form onSubmit={handleSubmit}>
        <div className="NameFirstName">
          <LabelInput className="name" htmlFor="lastName" label="Nom" type="text" id="lastName" ref={lastNameRef} />
          <LabelInput className="firstName" htmlFor="firstName" label="Prénom" type="text" id="firstName" ref={firstNameRef} />
        </div>

        <StarRating rating={rating} setRating={setRating} />

        <div className="formReview">
          <label htmlFor="review">Votre avis</label>
          <span className="review-counter">Caractères restant : {remainingChars}</span>
          <textarea id="review" ref={reviewRef} onChange={updateCharCounter} maxLength={MAX_CHARS} />
        </div>

        <Button className="buttonSubmit" type="submit" text="Partagez" />
      </form>
    </section>
  );
}
