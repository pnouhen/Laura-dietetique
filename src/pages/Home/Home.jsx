import { useState } from "react";

import Header from "../../components/Header/Header.jsx";
import BackgroundImg from "../../components/BackgroundImg/BackgroundImg.jsx";
import HomeCardObjectif from "../../components/Home-CardObjectif/HomeCardObjectif.jsx";
import HomeReviews from "../../components/Home-Reviews/HomeReviews.jsx";
import HomeSubmitReview from "../../components/Home-SubmitReview/HomeSubmitReview.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ModalMessage from "../../components/ModalMessage/MessageModal";

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
          <HomeCardObjectif
            article="manage"
            logo="fa-solid fa-seedling"
            title="Gérer durablement<br />votre poids"
            text="contre l’obésité, le<br />surpoids et la maigreur"
          />

          <HomeCardObjectif
            article="control"
            logo="fa-solid fa-scale-balanced"
            title="Contrôle<br />votre poids"
            text="face à des<br />changements de vie"
          />

          <HomeCardObjectif
            article="adapt"
            logo="fa-solid fa-rotate"
            title="Adapter votre<br />alimentation"
            text="pour éviter les problèmes<br />digestifs ou mieux vieillir"
          />

          <HomeCardObjectif
            article="face"
            logo="fa-solid fa-heart-pulse"
            title="Affronter les défis<br />quotidiens"
            text="comme une pathologie ou<br />un déséquilibre métabolique"
          />

          <HomeCardObjectif
            article="optimize"
            logo="fa-solid fa-dumbbell"
            title="Optimiser vos<br />performances"
            text="physiques et<br />sportives"
          />

          <HomeCardObjectif
            article="improve"
            logo="fa-solid fa-bullseye"
            title="Améliorer votre<br />alimentation"
            text="pour prendre soin<br />de votre corps"
          />
        </section>
        <HomeReviews />
        <HomeSubmitReview
          onSuccess={() => setIsSubmitted(true)}
          onValidationError={(msg) => setValidationError(msg)}
        />
      </main>
      <Footer />
       {/* Modals ici, en-dehors de <main> */}
      <ModalMessage
        action={isSubmitted}
        title="Avis déposé"
        onClickClose={() => closeModal("success")}
        message="Merci d'avoir partagé votre avis"
      />

      <ModalMessage
        action={!!validationError}
        title="Erreur de validation"
        onClickClose={() => closeModal("validation")}
        message={validationError}
      />
    </>
  );
}
