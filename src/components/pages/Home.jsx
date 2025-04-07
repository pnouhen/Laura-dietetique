import Header from "../structures/Header.jsx";
import SlideShow from "../ui/SlideShow.jsx";
import SubmitReview from "../ui/SubmitReview.jsx";
import "../../styles/home.scss";

export default function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <section className="objectif">
          <h2>Ensemble, nous pouvons :</h2>
          <div className="row">
            <article className="manage">
              <i className="fa-solid fa-seedling"></i>
              <h3>
                Gérer durablement <br /> votre poids
              </h3>
              <p>
                contre l’obésité, le
                <br /> surpoids et la maigreur
              </p>
            </article>

            <article className="control">
              <i className="fa-solid fa-scale-balanced"></i>
              <h3>
                Contrôle
                <br /> votre poids
              </h3>
              <p>
                face à des
                <br /> changements de vie
              </p>
            </article>

            <article className="adapt">
              <i className="fa-solid fa-rotate"></i>
              <h3>
                Adapter votre
                <br /> alimentation
              </h3>
              <p>
                pour éviter les problèmes
                <br /> digestifs ou mieux vieillir
              </p>
            </article>
          </div>
          <div className="row">
            <article className="face">
              <i className="fa-solid fa-heart-pulse"></i>
              <h3>
                Affronter les défis
                <br /> quotidiens
              </h3>
              <p>
                comme une pathologie ou
                <br /> un déséquilibre métabolique
              </p>
            </article>

            <article className="optimize">
              <i className="fa-solid fa-dumbbell"></i>
              <h3>
                Optimiser vos
                <br /> performances
              </h3>
              <p>
                physiques et
                <br /> sportives
              </p>
            </article>

            <article className="improve">
              <i className="fa-solid fa-bullseye"></i>
              <h3>
                Améliorer votre
                <br /> alimentation
              </h3>
              <p>
                pour prendre soin
                <br /> de votre corps
              </p>
            </article>
          </div>
        </section>
        <SlideShow />
        <SubmitReview />
      </div>
    </>
  );
}
