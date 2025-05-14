import { NavLink } from "react-router-dom";

import "./recipeDetailsSteps.scss";

export default function RecipeDetailsSteps({ connected, purchased, data }) {
  return (
    <div className="steps">
      <h3>Les étapes :</h3>
      {connected ? (
        purchased ? (
          <ul>
          {data.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
        ) : (
          <div className="connexionRecipeDetails">
          <p>
            Étant donné le temps investi dans la création des recettes, je
            demande une contribution de 1€ par recette. <br />
            Si cela vous intéresse, ajoutez la recette à votre panier en
            cliquant sur ce boutton :
          </p>
          <a href=".">Acheter la recette</a>
        </div>
        )
      ) : (
        <div className="connexionRecipeDetails">
          <p>
            Étant donné le temps investi dans la création des recettes, je
            demande une contribution de 1€ par recette. <br />
            Si cela vous intéresse, vous pouvez vous inscrire ou vous connecter
            en cliquant ici :
          </p>
          <NavLink to={`/se-connecter`}>Connexion / Inscription</NavLink>
        </div>
      )}
    </div>
  );
}
