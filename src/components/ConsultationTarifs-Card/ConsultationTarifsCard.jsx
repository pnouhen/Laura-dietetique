import "./consultationTarifsCard.scss"

export default function ConsultationTarifsCard({
  title,
  duration,
  description,
  price,
  coupleRate,
  priceCondition,
}) {
  return (
    <section className="consultationTarifsCard">
      <h2>{title}</h2>
      <div className="duration">
        <h3>{duration == "" ? "" : "Durée :"}</h3>
        <p>{duration}</p>
      </div>
      <div className="description">
        <h3>Description :</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </div>
      <div className="price">
        <h3>{price == "" ? "" : "Tarif :"}</h3>
        <p>{price}</p>
      </div>
      <div className="coupleRate">
        <h3>{coupleRate == "" ? "" : "Tarif en couple :"}</h3>
        <p>{coupleRate}</p>
      </div>
      {priceCondition}
    </section>
  );
}
