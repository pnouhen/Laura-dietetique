import Header from "../structures/Header.jsx";
import SlideShows from "../ui/SlideShow.jsx";
import "../../styles/home.scss";

export default function Home() {
  return (
    <>
      <Header />
      <section className="home">
        <section className="about">
          <img src="/assets/img/LauraPicture.avif" alt="Photo de Laura" />
          <div className="about___container">
            <h2>Qui suis-je ?</h2>
            <p>
              Passionnée par l'importance de l'alimentation sur la santé, c'est
              naturellement que je me suis orientée vers des études en
              diététique.
              <br />
              Après un Bac scientifique, je suis rentrée à l'Université
              d'Auvergne et j'ai obtenu mon DUT (Diplôme Universitaire de
              Technologie) option diététique en 2011.
              <br />
              Depuis 9 ans j'exerce le métier de diététicienne nutritionniste.
              Durant ces années j'ai pu me perfectionner notamment dans les
              accompagnements individuels et personnalisés. Chaque être humain
              est à part, a sa propre histoire avec ses antécédents et ses
              difficultés personnelles. Ma vision de la nutrition est
              indissociable de la dimension humaine et psychologique.
              <br />
              Aujourd'hui, je vous propose des consultations au cabinet ou à
              distance pour vous transmettre mes connaissances en nutrition, et
              vous apporter toujours de nouvelles solutions pour atteindre vos
              objectifs personnels!
            </p>
          </div>
        </section>
        <section className="objectifs">
          <h2>
            Diététicienne-Nutritionniste <br></br>diplômée d'état
          </h2>
          <article className="help">
            <h3>Je vous propose mon aide :</h3>
            <p>
              Que vous veniez par vous-même ou sur une prescription médicale, le
              diététicien est le professionnel de santé qui peut vous aider
              efficacement à équilibrer votre alimentation de manière durable et
              adaptée à votre situation personnelle.
            </p>
          </article>
          <article className="wish">
            <h3>Vous souhaitez :</h3>
            <ul>
              <li>
                Prendre en charge vos problèmes de poids de manière DURABLE :
                obésité, surpoids ou maigreur.
              </li>
              <li>
                Contrôler votre poids dans les moments difficiles tels que
                l'arrêt du tabac, la ménopause, une grossesse, des changements
                d'horaires de travail.
              </li>
              <li>
                Faire face à une pathologie ou un déséquilibre métabolique :
                diabète, maladie cardiovasculaire, dérèglement thyroïdien,
                hypercholestérolémie, hypertension artérielle...
              </li>
              <li>
                Adapter votre alimentation pour éviter les problèmes digestifs
                ou mieux vieillir.
              </li>
              <li>Améliorer vos performances physiques et sportives.</li>
              <li>
                Tout simplement améliorer votre alimentation pour prendre soin
                de votre corps.
              </li>
            </ul>
          </article>
        </section>
        <SlideShows />
      </section>
    </>
  );
}
