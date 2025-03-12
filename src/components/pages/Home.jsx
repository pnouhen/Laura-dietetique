import Header from "../structures/Header.jsx";
import "../../styles/home.scss";
export default function Home() {
  return (
    <>
      <Header />
      <section className="objectifs">
        <div className="objectifs___container">
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
        </div>
      </section>
    </>
  );
}
