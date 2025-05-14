import "./recipeCard.scss";

export default function RecipeCard({
  duration,
  admin,
  mode,
  classNameRegime,
  textRegime,
  src,
  title,
}) {
  return (
    <div className="cardRecipe">
      <p className="duration">{duration}</p>
      {admin && mode === "delete" && <i className="fa-solid fa-trash"></i>}
      {admin && mode === "edit" && <i className="fa-solid fa-pen"></i>}
      <p className={classNameRegime}>{textRegime}</p>
      <img src={src} alt={`Image de ${title}`} loading="eager" />
      <h3>{title}</h3>
    </div>
  );
}
