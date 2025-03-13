import Header from "../structures/Header.jsx";

export default function About() {
  return (
    <>
      <Header />
      <section className="about">
        <div className="about___container">
        <img src="/assets/img/LauraPicture.avif" alt="Photo de Laura" />
          <h2>Qui suis-je ?</h2>
        <p>
          Passionnée par l'importance de l'alimentation sur la santé, c'est
          naturellement que je me suis orientée vers des études en diététique.
          <br />
          Après un Bac scientifique, je suis rentrée à l'Université d'Auvergne
          et j'ai obtenu mon DUT (Diplôme Universitaire de Technologie) option
          diététique en 2011.
          <br />
          Depuis 9 ans j'exerce le métier de diététicienne nutritionniste.
          Durant ces années j'ai pu me perfectionner notamment dans les
          accompagnements individuels et personnalisés. Chaque être humain est à
          part, a sa propre histoire avec ses antécédents et ses difficultés
          personnelles. Ma vision de la nutrition est indissociable de la
          dimension humaine et psychologique.
          <br />
          Aujourd'hui, je vous propose des consultations au cabinet ou à
          distance pour vous transmettre mes connaissances en nutrition, et vous
          apporter toujours de nouvelles solutions pour atteindre vos objectifs
          personnels!
        </p>
        </div>
      </section>
    </>
  );
}
