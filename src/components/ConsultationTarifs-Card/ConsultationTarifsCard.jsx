import "./consultationTarifsCard.scss";

export default function ConsultationTarifsCard({
  title,
  duration,
  description,
  price,
  coupleRate,
  tarifs,
  priceCondition,
}) {
  // Unité de prix
  const euroNote = "€*";

  return (
    <section className="consultationTarifsCard">
      <h2>{title}</h2>

      {/* Les conditions permettent d'adapter la carte en fonction des elements souhaités */}
      {duration != "" && (
        <div className="duration">
          <h3>{duration == "" ? "" : "Durée :"}</h3>
          <p>{duration}</p>
        </div>
      )}
      <div className="description">
        <h3>Description :</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </div>
      {tarifs === true && (
        <>
          <div className="price">
            <h3>Tarif :</h3>
            <p>
              {price}
              {euroNote}
            </p>
          </div>
          <div className="coupleRate">
            <h3>Tarif en couple :</h3>
            <p>
              {coupleRate}
              {euroNote}
            </p>
          </div>
        </>
      )}
      {priceCondition === true && (
        <p className="priceCondition">
          *Modes de règlement: Chèques, virements ou espèces. De plus, certaines
          mutuelles prennent en charge les consultations diététiques, renseignez
          vous auprès de la vôtre. Les justificatifs nécessaires vous seront
          délivrés.
        </p>
      )}
    </section>
  );
}
