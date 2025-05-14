import { useState } from "react";

import Header from "../../components/Header/Header";
import BackgroundImg from "../../components/BackgroundImg/BackgroundImg";
import AuthPageConnexionForm from "../../components/AuthPage-ConnexionForm/AuthPageConnexionForm";
import AuthPageSignInForm from "../../components/AuthPage-SignInForm/AuthPageSignInForm";
import Footer from "../../components/Footer/Footer";
import MessageModal from "../../components/MessageModal/MessageModal";

import "./authPage.scss";

export default function AuthPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const closeModal = (type) => {
    if (type === "success") setIsSubmitted(false);
    if (type === "validation") setValidationError(null);
  };

  return (
    <>
      <Header />
      <main className="authPage">
        <BackgroundImg url="/assets/img/background/background-connexion.webp" />
        <AuthPageConnexionForm onValidationError={setValidationError} />
        <AuthPageSignInForm
          onValidationError={setValidationError}
          onSuccess={() => setIsSubmitted(true)}
        />
      </main>
      <Footer />
      <MessageModal
        action={isSubmitted}
        poster="message"
        title="Inscription envoyée"
        clickPoster={() => closeModal("success")}
        clickClose={() => closeModal("success")}
        message="Vous allez recevoir un mail pour valider votre inscription"
      />
      <MessageModal
        action={!!validationError}
        poster="message"
        title="Erreur de validation"
        clickPoster={() => closeModal("validation")}
        clickClose={() => closeModal("validation")}
        message={validationError}
      />
    </>
  );
}
