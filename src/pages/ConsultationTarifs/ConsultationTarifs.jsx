import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData.jsx";

import ButtonSimul from "../../components/ButtonSimul/ButtonSimul.jsx";
import Header from "../../components/Header/Header.jsx";
import BackgroundImg from "../../components/BackgroundImg/BackgroundImg.jsx";
import ConsultationTarifsCard from "../../components/ConsultationTarifs-Card/ConsultationTarifsCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import "./consultationTarifs.scss";

export default function ConsultationTarifs() {
  const [admin, setAdmin] = useState(false);
  const [tarif, setTarif] = useState();

  // Appel au fetch pour recuperer la base de données des tarifs
  useEffect(() => {
    fetchData("data/tarifs.json")
      .then((data) => setTarif(data))
      .catch((error) => console.error("Erreur de chargement admin :", error));
  }, []);

  /** Fonction pour aller chercher le tarif souhaité :
   *  consultType pour selectionner firstConsult ou followUpConsult
   *  index + property pour choisir entre price et coupleRate
   */
  const getTarifValue = (consultType, index, property) => {
    if (consultType === "first") {
      return tarif?.firstConsult?.[index]?.[property] || "";
    } else if (consultType === "followUp") {
      return tarif?.followUpConsult?.[index]?.[property] || "";
    }
    return "";
  };

  // Tableau contenant les 3 cards
  const cardsConsultTarif = [
    {
      title:
        "Premier bilan nutritionnel avec analyse de composition corporelle:",
      duration: "une heure",
      description: `Le premier bilan me permettra de
          <strong>mieux vous connaître</strong> (mode de vie, habitudes
          alimentaires, goûts, problèmes et antécédents médicaux,
          composition corporelle, objectifs...). Grâce à cette première
          analyse, je serai en mesure de vous proposer une prise en charge
          diététique
          <strong> personnalisée et adaptée à VOS besoins.</strong>`,
      tarifs: true,
      price: getTarifValue("first", 0, "price"),
      coupleRate: getTarifValue("first", 1, "coupleRate"),
      priceCondition: true,
    },
    {
      title: "Consultation de suivi :",
      duration: "30 minutes",
      description: `Pour vous assurer de bons résultats, je recommande des RDV tous
          les 15 jours à 1 fois par mois.
          <br />
          Lors de chaque rendez-vous, nous analyserons ensemble l'évolution
          de vos habitudes hygiéno-diététiques, de votre composition
          corporelle et de vos mensurations, votre état de santé...
          <br />
          En fonction des résultats, j'adapterai votre prise en charge
          diététique. Nous travaillerons en équipe, je serai à l'écoute pour
          trouver les solutions les mieux adaptées à votre situation
          personnelle.`,
      tarifs: true,
      price: getTarifValue("followUp", 0, "price"),
      coupleRate: getTarifValue("followUp", 1, "coupleRate"),
      priceCondition: true,
    },
    {
      title: "Consultation à distance :",
      duration: "",
      description: `Pour pouvoir répondre au plus grand nombre et m'adapter à vos
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
          propre ressenti ou en vous pesant vous même à la maison.`,
    },
  ];

  return (
    <>
      <Header />
      <main className="methodRate">
        <ButtonSimul
          className="consultAdmin"
          onClick={() => setAdmin(!admin)}
          text={admin === false ? "Admin" : "User"}
        />

        <BackgroundImg url="/assets/img/background/background-methodRate.webp" />

        {/* Map du tableau */}
        {cardsConsultTarif.map(
          ({
            data,
            title,
            duration,
            description,
            tarifs,
            price,
            coupleRate,
            priceCondition,
          }) => (
            <ConsultationTarifsCard
              key={title}
              data={data}
              title={title}
              duration={duration}
              description={description}
              tarifs={tarifs}
              price={price}
              coupleRate={coupleRate}
              priceCondition={priceCondition}
            />
          )
        )}
      </main>

      <Footer />
    </>
  );
}
