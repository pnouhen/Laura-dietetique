import "./cardRecipe.scss";

export default function CardRecipe({
  classNameRegime,
  textRegime,
  src,
  title,
}) {
  return (
    <div className="cardRecipe">
      <p className={classNameRegime}>{textRegime}</p>
      <img src={src} alt={`Image de ${title}`} loading="eager" />
      <h3>{title}</h3>
    </div>
  );
}
