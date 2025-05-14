import { useState } from "react";

import Header from "../../components/Header/Header.jsx";
import BackgroundImg from "../../components/BackgroundImg/BackgroundImg.jsx";
import CardObjectif from "../../components/CardObjectif/CardObjectif.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import SubmitReview from "../../components/SubmitReview/SubmitReview.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import MessageModal from "../../components/MessageModal/MessageModal.jsx"

import "./home.scss";

export default function Home() {

  // ModalMessage is here for the background color
const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const closeModal = (type) => {
    if (type === "success") setIsSubmitted(false);
    if (type === "validation") setValidationError(null);
  };

  return (
    <>
      <Header />
      <main className="home">
        <BackgroundImg url="/assets/img/background/background-home.webp" />
        <section className="objectif">
          <h2>Ensemble, nous pouvons :</h2>
          <CardObjectif
            article="cardObjectif manage"
            logo="fa-solid fa-seedling"
            title="Gérer durablement<br />votre poids"
            text="contre l’obésité, le<br />surpoids et la maigreur"
          />

          <CardObjectif
            article="cardObjectif control"
            logo="fa-solid fa-scale-balanced"
            title="Contrôle<br />votre poids"
            text="face à des<br />changements de vie"
          />

          <CardObjectif
            article="cardObjectif adapt"
            logo="fa-solid fa-rotate"
            title="Adapter votre<br />alimentation"
            text="pour éviter les problèmes<br />digestifs ou mieux vieillir"
          />

          <CardObjectif
            article="cardObjectif face"
            logo="fa-solid fa-heart-pulse"
            title="Affronter les défis<br />quotidiens"
            text="comme une pathologie ou<br />un déséquilibre métabolique"
          />

          <CardObjectif
            article="cardObjectif optimize"
            logo="fa-solid fa-dumbbell"
            title="Optimiser vos<br />performances"
            text="physiques et<br />sportives"
          />

          <CardObjectif
            article="cardObjectif improve"
            logo="fa-solid fa-bullseye"
            title="Améliorer votre<br />alimentation"
            text="pour prendre soin<br />de votre corps"
          />
        </section>
        <Reviews />
        <SubmitReview
          onSuccess={() => setIsSubmitted(true)}
          onValidationError={(msg) => setValidationError(msg)}
        />
      </main>
      <Footer />
       {/* Modals ici, en-dehors de <main> */}
      <MessageModal
        action={isSubmitted}
        poster="message"
        title="Avis déposé"
        clickPoster={() => closeModal("success")}
        clickClose={() => closeModal("success")}
        message="Merci d'avoir partagé votre avis"
      />

      <MessageModal
        action={!!validationError}
        poster="message"
        title="Elément(s) manquant(s)"
        clickPoster={() => closeModal("validation")}
        clickClose={() => closeModal("validation")}
        message={validationError}
      />
    </>
  );
}
