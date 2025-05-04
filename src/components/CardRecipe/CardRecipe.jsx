import "./cardRecipe.scss";

export default function CardRecipe({ key, title, src }) {
  return (
    <div className="cardRecipe" key={key}>
      <h3>{title}</h3>
      <img src={src} alt={`Image of ${title}`} loading="lazy" />
    </div>
  );
}
