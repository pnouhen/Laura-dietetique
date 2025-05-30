import Header from "../../components/Header/Header.jsx";
import BackgroundImg from "../../components/BackgroundImg/BackgroundImg.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import "./about.scss";

export default function About() {
  return (
    <>
      <Header />
      <main className="about">
        <BackgroundImg url="/assets/img/background/background-about.webp" />
        <section className="about_container">
          <img src="/assets/img/LauraPicture.webp" alt="Photo de Laura" />
          <div className="text">
            <p>
              Passionnée par l'importance de l'alimentation sur la santé, c'est
              naturellement que je me suis orientée vers des études en
              diététique.
            </p>
            <p>
              Après un Bac scientifique, je suis rentrée à l'Université
              d'Auvergne et j'ai obtenu mon DUT (Diplôme Universitaire de
              Technologie) option diététique en 2011.
            </p>
            <p>
              Depuis 9 ans j'exerce le métier de diététicienne nutritionniste.
              Durant ces années j'ai pu me perfectionner notamment dans les
              accompagnements individuels et personnalisés. Chaque être humain
              est à part, a sa propre histoire avec ses antécédents et ses
              difficultés personnelles. Ma vision de la nutrition est
              indissociable de la dimension humaine et psychologique.
            </p>
            <p>
              Aujourd'hui, je vous propose des consultations au cabinet ou à
              distance pour vous transmettre mes connaissances en nutrition, et
              vous apporter toujours de nouvelles solutions pour atteindre vos
              objectifs personnels!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
