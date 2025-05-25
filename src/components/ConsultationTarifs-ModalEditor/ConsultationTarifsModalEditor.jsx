import { useState, useEffect } from "react";
import LabelInput from "../LabelInput/LabelInput";
import Button from "../Button/Button";

import "./consultationTarifsModalEditor.scss";

export default function ConsultationTarifsModalEditor({
  getTarifValue,
  setTarifs,
}) {
  // État local pour stocker les modifications temporaires
  const [tempTarifs, setTempTarifs] = useState({
    firstConsult: {
      price: "",
      coupleRate: "",
    },
    followUpConsult: {
      price: "",
      coupleRate: "",
    },
  });

  // Initialiser les valeurs temporaires avec les valeurs actuelles
  useEffect(() => {
    setTempTarifs({
      firstConsult: {
        price: getTarifValue("first", 0, "price"),
        coupleRate: getTarifValue("first", 1, "coupleRate"),
      },
      followUpConsult: {
        price: getTarifValue("followUp", 0, "price"),
        coupleRate: getTarifValue("followUp", 1, "coupleRate"),
      },
    });
  }, [getTarifValue]);

  // Fonction pour sauvegarder les modifications
  const handleSave = () => {
    setTarifs((prev) => ({
      ...prev,
      firstConsult: [
        { price: tempTarifs.firstConsult.price },
        { coupleRate: tempTarifs.firstConsult.coupleRate },
      ],
      followUpConsult: [
        { price: tempTarifs.followUpConsult.price },
        { coupleRate: tempTarifs.followUpConsult.coupleRate },
      ],
    }));
  };

  // Vérifier que toutes les input sont remplis
  const isInputTarifsComplete =
    tempTarifs.firstConsult.price &&
    tempTarifs.followUpConsult.coupleRate &&
    tempTarifs.followUpConsult.price &&
    tempTarifs.firstConsult.coupleRate;

  const contenant = [
    {
      title: "Premier bilan",
      firstConsultPrice: {
        htmlFor: "firstConsultPrice",
        label: "Tarif :",
        id: "firstConsultPrice",
        type: "number",
        value: tempTarifs.firstConsult.price,
        onChange: (e) => {
          setTempTarifs((prev) => ({
            ...prev,
            firstConsult: {
              ...prev.firstConsult,
              price: e.target.value,
            },
          }));
        },
      },
      firstConsultCoupleRate: {
        htmlFor: "firstConsultCoupleRate",
        label: "Tarif en couple :",
        id: "firstConsultCoupleRate",
        type: "number",
        value: tempTarifs.firstConsult.coupleRate,
        onChange: (e) => {
          setTempTarifs((prev) => ({
            ...prev,
            firstConsult: {
              ...prev.firstConsult,
              coupleRate: e.target.value,
            },
          }));
        },
      },
    },
    {
      title: "Consultation suivi",
      firstConsultPrice: {
        htmlFor: "followUpPrice",
        label: "Tarif :",
        id: "followUpPrice",
        type: "number",
        value: tempTarifs.followUpConsult.price,
        onChange: (e) => {
          setTempTarifs((prev) => ({
            ...prev,
            followUpConsult: {
              ...prev.followUpConsult,
              price: e.target.value,
            },
          }));
        },
      },
      firstConsultCoupleRate: {
        htmlFor: "followUpCoupleRate",
        label: "Tarif en couple :",
        id: "followUpCoupleRate",
        type: "number",
        value: tempTarifs.followUpConsult.coupleRate,
        onChange: (e) => {
          setTempTarifs((prev) => ({
            ...prev,
            followUpConsult: {
              ...prev.followUpConsult,
              coupleRate: e.target.value,
            },
          }));
        },
      },
    },
  ];

  return (
    <section className="modalEditor">
      <h2>Modifier les tarifs</h2>
      {contenant.map((item, i) => (
        <article key={i}>
          <h3>{item.title}</h3>
          <LabelInput
            className="labelInputModalEditor"
            htmlFor={item.firstConsultPrice.htmlFor}
            label={item.firstConsultPrice.label}
            id={item.firstConsultPrice.id}
            type={item.firstConsultPrice.type}
            value={item.firstConsultPrice.value}
            onChange={item.firstConsultPrice.onChange}
          />
          <LabelInput
            className="labelInputModalEditor"
            htmlFor={item.firstConsultCoupleRate.htmlFor}
            label={item.firstConsultCoupleRate.label}
            id={item.firstConsultCoupleRate.id}
            type={item.firstConsultCoupleRate.type}
            value={item.firstConsultCoupleRate.value}
            onChange={item.firstConsultCoupleRate.onChange}
          />
        </article>
      ))}
      <Button className={!isInputTarifsComplete ? "displayNone" : "saveConsult"} onClick={handleSave} text="Sauvegarder" />
    </section>
  );
}
