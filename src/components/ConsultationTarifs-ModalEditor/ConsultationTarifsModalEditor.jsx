import LabelInput from "../LabelInput/LabelInput";
import Button from "../Button/Button";

import "./consultationTarifsModalEditor.scss";

export default function ConsultationTarifsModalEditor({
  getTarifValue,
  setTarifs,
}) {
  const contenant = [
    {
      title: "Premier bilan",
      firstConsultPrice: {
        htmlFor: "firstConsultPrice",
        label: "Tarif :",
        id: "firstConsultPrice",
        type: "number",
        value: getTarifValue("first", 0, "price"),
        onChange: (e) => {
          setTarifs((prev) => {
            const updated = { ...prev };
            updated.firstConsult[0].price = e.target.value;
            return updated;
          });
        },
      },
      firstConsultCoupleRate: {
        htmlFor: "firstConsultCoupleRate",
        label: "Tarif en couple :",
        id: "firstConsultCoupleRate",
        type: "number",
        value: getTarifValue("first", 1, "coupleRate"),
        onChange: (e) => {
          setTarifs((prev) => {
            const updated = { ...prev };
            updated.firstConsult[1].coupleRate = e.target.value;
            return updated;
          });
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
        value: getTarifValue("followUp", 0, "price"),
        onChange: (e) => {
          setTarifs((prev) => {
            const updated = { ...prev };
            updated.followUpConsult[0].price = e.target.value;
            return updated;
          });
        },
      },
      firstConsultCoupleRate: {
        htmlFor: "followUpCoupleRate",
        label: "Tarif en couple :",
        id: "followUpCoupleRate",
        type: "number",
        value: getTarifValue("followUp", 1, "coupleRate"),
        onChange: (e) => {
          setTarifs((prev) => {
            const updated = { ...prev };
            updated.followUpConsult[1].coupleRate = e.target.value;
            return updated;
          });
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
      <Button />
    </section>
  );
}
