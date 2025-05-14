import Header from "../../components/Header/Header.jsx";
import BackgroundImg from "../../components/BackgroundImg/BackgroundImg.jsx";
import ConsultationTarifsCard from "../../components/ConsultationTarifs-Card/ConsultationTarifsCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import "./consultationTarifs.scss";

export default function ConsultationTarifs() {
  const priceCondition = (
    <p className="priceCondition">
      *Modes de règlement: Chèques, virements ou espèces. De plus, certaines
      mutuelles prennent en charge les consultations diététiques, renseignez
      vous auprès de la vôtre. Les justificatifs nécessaires vous seront
      délivrés.
    </p>
  );
  return (
    <>
      <Header />
      <main className="methodRate">
        <BackgroundImg url="/assets/img/background/background-methodRate.webp" />
        {/* Premier bilan */}
        <ConsultationTarifsCard
          title="Premier bilan nutritionnel avec analyse de composition corporelle:"
          duration="une heure"
          description={`Le premier bilan me permettra de
          <strong>mieux vous connaître</strong> (mode de vie, habitudes
          alimentaires, goûts, problèmes et antécédents médicaux,
          composition corporelle, objectifs...). Grâce à cette première
          analyse, je serai en mesure de vous proposer une prise en charge
          diététique
          <strong> personnalisée et adaptée à VOS besoins.</strong>`}
          price="70€*"
          coupleRate="120€*"
          priceCondition={priceCondition}
        />

        {/* Consultation de suivi */}
        <ConsultationTarifsCard
          title="Consultation de suivi :"
          duration="30 minutes"
          description={`Pour vous assurer de bons résultats, je recommande des RDV tous
          les 15 jours à 1 fois par mois.
          <br />
          Lors de chaque rendez-vous, nous analyserons ensemble l'évolution
          de vos habitudes hygiéno-diététiques, de votre composition
          corporelle et de vos mensurations, votre état de santé...
          <br />
          En fonction des résultats, j'adapterai votre prise en charge
          diététique. Nous travaillerons en équipe, je serai à l'écoute pour
          trouver les solutions les mieux adaptées à votre situation
          personnelle.`}
          price="40€*"
          coupleRate="60€*"
          priceCondition={priceCondition}
        />

        {/* Consultation à distance */}
        <ConsultationTarifsCard
          title="Consultation à distance :"
          duration=""
          description={`Pour pouvoir répondre au plus grand nombre et m'adapter à vos
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
          propre ressenti ou en vous pesant vous même à la maison.`}
          price=""
          coupleRate=""
        />
      </main>
      <Footer />
    </>
  );
}
