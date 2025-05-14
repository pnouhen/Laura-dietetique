import { useState, useRef, useEffect } from "react";
import { isFormEmpty, resetFormFields } from "../../services/formUtils";

import LabelInput from "../LabelInput/LabelInput";
import HomeStarRating from "../Home-StarRating/HomeStarRating";
import Button from "../Button/Button";

import "./homeSubmitReview.scss";

export default function HomeSubmitReview({ onSuccess, onValidationError }) {
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 450;

  useEffect(() => {
    updateCharCounter();
  }, []);

  const updateCharCounter = () => {
    if (reviewRef.current) {
      setCharCount(reviewRef.current.value.length);
    }
  };

  const remainingChars = MAX_CHARS - charCount;

  const lastNameRef = useRef();
  const firstNameRef = useRef();
  const [rating, setRating] = useState(0);
  const reviewRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const refs = [lastNameRef, firstNameRef, reviewRef];
    const checks = [rating !== 0];

    if (isFormEmpty(refs, checks)) {
      onValidationError("Veuillez remplir tous les éléments");
      return;
    }

    onSuccess();
    resetForm();
  };

  const resetForm = () => {
    resetFormFields(
      [lastNameRef, firstNameRef, reviewRef],
      [() => setRating(0), () => setCharCount(0)]
    );
  };

  return (
    <section className="submitReview">
      <h2>Laisser un avis :</h2>
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

        <HomeStarRating rating={rating} setRating={setRating} />

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
        <Button className="buttonSubmit" type="submit" text="Partagez" />
      </form>
    </section>
  );
}
