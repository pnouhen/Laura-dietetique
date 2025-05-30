import { NavLink } from "react-router-dom";

import "./recipeCard.scss";

export default function RecipeCard({
  id,
  duration,
  classNameRegime,
  textRegime,
  src,
  title,
}) {
  return (
    <NavLink className="cardRecipe" id={id} to={`/recettes/${id}`}>
      <p className="duration">{duration}</p>
      <p className={classNameRegime}>{textRegime}</p>
      <img src={src} alt={`Image de ${title}`} loading="eager" />
      <h3>{title}</h3>
    </NavLink>
  );
}
