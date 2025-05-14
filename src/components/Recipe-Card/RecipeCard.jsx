

import "./recipeCard.scss";

export default function RecipeCard({
  duration,
  classNameRegime,
  textRegime,
  src,
  title,
}) {
  return (
      <div className="cardRecipe">
       <p className="duration">{duration}</p>
      <p className={classNameRegime}>{textRegime}</p>
      <img src={src} alt={`Image de ${title}`} loading="eager" />
      <h3>{title}</h3> 
      </div>
      
    
  );
}
