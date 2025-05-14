import { useRef } from "react";
import { isFormEmpty, resetFormFields } from "../../services/formUtils";

import LabelInput from "../LabelInput/LabelInput";
import Button from "../Button/Button";

export default function AuthPageSignInForm({ onSuccess, onValidationError }) {
  const nameSignInRef = useRef();
  const firstNameSignInRef = useRef();
  const emailSignInRef = useRef();
  const passwordSignInRef = useRef();
  const confirmPasswordSignInRef = useRef();

  const handleSubmit = (event) => {
  event.preventDefault();

  const refs = [
    nameSignInRef,
    firstNameSignInRef,
    emailSignInRef,
    passwordSignInRef,
    confirmPasswordSignInRef,
  ];

  if (isFormEmpty(refs)) {
    onValidationError("Veuillez remplir tous les éléments");
    return;
  }

  if (passwordSignInRef.current.value !== confirmPasswordSignInRef.current.value) {
    onValidationError("Les mots de passe ne correspondent pas");
    return;
  }
  if (passwordSignInRef.current.value.length < 8) {
    onValidationError("Le mot de passe doit contenir 8 caractères minimun");
    return;
  }

  onSuccess();
  resetForm();
};

  const resetForm = () => {
    resetFormFields([
      nameSignInRef,
      firstNameSignInRef,
      emailSignInRef,
      passwordSignInRef,
      confirmPasswordSignInRef,
    ]);
  };

  return (
    <div className="authPage-SignInForm">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <LabelInput
          className="name"
          htmlFor="name"
          label="Nom :"
          type="text"
          id="name"
          ref={nameSignInRef}
        />
        <LabelInput
          className="firstName"
          htmlFor="firstName"
          label="Prénom :"
          type="text"
          id="firstName"
          ref={firstNameSignInRef}
        />
        <LabelInput
          className="e-mailSignIn"
          htmlFor="email"
          label="Email :"
          type="email"
          id="email"
          ref={emailSignInRef}
        />
        <LabelInput
          className="passwordSignIn"
          htmlFor="password"
          label="Mot de passe :"
          type="password"
          id="password"
          ref={passwordSignInRef}
        />
        <LabelInput
          className="checkpasswordSignIn"
          htmlFor="confirmPassword"
          label="Confirmer votre mot de passe :"
          type="password"
          id="confirmPassword"
          ref={confirmPasswordSignInRef}
        />
        <Button text="S'inscrire" />
      </form>
    </div>
  );
}
