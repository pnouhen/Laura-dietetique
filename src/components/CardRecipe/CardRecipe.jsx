import { NavLink } from "react-router-dom";

import "./cardRecipe.scss";

export default function CardRecipe({
  id,
  duration,
  classNameRegime,
  textRegime,
  src,
  title,
}) {
  return (
    <NavLink className="cardRecipe" to={`/recettes/${id}`} key={id}>
      <p className="duration">{duration}</p>
      <p className={classNameRegime}>{textRegime}</p>
      <img src={src} alt={`Image de ${title}`} loading="eager" />
      <h3>{title}</h3>
    </NavLink>
    
  );
}
