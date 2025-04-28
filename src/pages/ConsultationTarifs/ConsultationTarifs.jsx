import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import "./consultationTarifs.scss";

export default function ConsultationTarifs() {
  const priceCondition = (
    <p className="priceCondition">
      *Modes de règlement: Chèques, virements ou espèces. De plus,
      certaines mutuelles prennent en charge les consultations
      diététiques, renseignez vous auprès de la vôtre. Les justificatifs
      nécessaires vous seront délivrés.
    </p>
  );
  return (
    <>
      <Header />
      <section className="methodRate">
          {/* First consult */}
          <article>
            <h2>
              Premier bilan nutritionnel avec analyse de composition corporelle
              :
            </h2>
            <div className="duration">
              <h3>Durée :</h3>
              <p>une heure</p>
            </div>
            <div className="description">
              <h3>Description :</h3>
              <p>
                Le premier bilan me permettra de{" "}
                <strong>mieux vous connaître</strong> (mode de vie, habitudes
                alimentaires, goûts, problèmes et antécédents médicaux,
                composition corporelle, objectifs...). Grâce à cette première
                analyse, je serai en mesure de vous proposer une prise en charge
                diététique{" "}
                <strong> personnalisée et adaptée à VOS besoins.</strong>
              </p>
            </div>
            <div className="price">
              <h3>Tarif :</h3>
              <p>70€*</p>
            </div>
            <div className="coupleRate">
              <h3>Tarif en couple</h3>
              <p>120€*</p>
            </div>
            {priceCondition}
          </article>
          {/* Follow-up consult */}
          <article>
            <h2>Consultation de suivi :</h2>
            <div className="duration">
              <h3>Durée :</h3>
              <p>30 minutes</p>
            </div>
            <div className="description">
              <h3>Description :</h3>
              <p>
                Pour vous assurer de bons résultats, je recommande des RDV tous
                les 15 jours à 1 fois par mois.
                <br />
                Lors de chaque rendez-vous, nous analyserons ensemble
                l'évolution de vos habitudes hygiéno-diététiques, de votre
                composition corporelle et de vos mensurations, votre état de
                santé...
                <br />
                En fonction des résultats, j'adapterai votre prise en charge
                diététique. Nous travaillerons en équipe, je serai à l'écoute
                pour trouver les solutions les mieux adaptées à votre situation
                personnelle.
              </p>
            </div>
            <div className="price">
              <h3>Tarif :</h3>
              <p>40€*</p>
            </div>
            <div className="coupleRate">
              <h3>Tarif en couple</h3>
              <p>60€*</p>
            </div>
            {priceCondition}
          </article>
          
          {/* Other consult */}
          <article>
            <h2>Consultation à distance :</h2>
            <div className="description">
              <h3>Description :</h3>
              <p>
                Pour pouvoir répondre au plus grand nombre et m'adapter à vos
                disponibilités, je vous propose également des consultations à
                distance.
                <br />
                <br />
                Les consignes seront aussi précises qu'en cabinet, je vous
                enverrai en direct le programme à suivre par mail.
                <br />
                <br />
                La seule chose en moins sera la balance mais il est possible de
                faire du très bon travail autrement, en prêtant attention à son
                propre ressenti ou en vous pesant vous même à la maison.
              </p>
            </div>
          </article>
      </section>
      <Footer />
    </>
  );
}
