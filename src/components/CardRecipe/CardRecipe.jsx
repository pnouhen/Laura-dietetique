import "./cardRecipe.scss";

export default function CardRecipe({ title, src }) {
  return (
    <div className="cardRecipe">
      <h3>{title}</h3>
      <img src={src} alt={`Image de ${title}`} loading="lazy" />
    </div>
  );
}

