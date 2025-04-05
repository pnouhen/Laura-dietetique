import Header from "../structures/Header.jsx";
import SlideShow from "../ui/SlideShow.jsx"
import "../../styles/home.scss";

export default function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <section className="objectif">
          <h2>Ensemble, nous pouvons :</h2>
          <div className="row">
            <article class="manage">
              <i class="fa-solid fa-seedling"></i>
              <h3>
                Gérer durablement <br /> votre poids
              </h3>
              <p>
                contre l’obésité, le
                <br /> surpoids et la maigreur
              </p>
            </article>

            <article class="control">
              <i class="fa-solid fa-scale-balanced"></i>
              <h3>
                Contrôle
                <br /> votre poids
              </h3>
              <p>
                face à des
                <br /> changements de vie
              </p>
            </article>

            <article class="adapt">
              <i class="fa-solid fa-rotate"></i>
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
            <article class="face">
              <i class="fa-solid fa-heart-pulse"></i>
              <h3>
                Affronter les défis
                <br /> quotidiens
              </h3>
              <p>
                comme une pathologie ou
                <br /> un déséquilibre métabolique
              </p>
            </article>

            <article class="optimize">
              <i class="fa-solid fa-dumbbell"></i>
              <h3>
                Optimiser vos
                <br /> performances
              </h3>
              <p>
                physiques et
                <br /> sportives
              </p>
            </article>

            <article class="improve">
              <i class="fa-solid fa-bullseye"></i>
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
        <section>
          <SlideShow />
        </section>
      </div>
    </>
  );
}
