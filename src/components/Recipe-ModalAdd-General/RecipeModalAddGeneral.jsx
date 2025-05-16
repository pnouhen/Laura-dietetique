import LabelInput from "../LabelInput/LabelInput";

import "./recipeModalAddGeneral.scss";

export default function RecipeModalAddGeneral() {
  return (
    <form action="">
      <LabelInput
        htmlFor="title"
        label="Titre de la recette"
        type="text"
        id="title"
      />
      {/* Mettre des select et voir pour créer un composant + mixin avec input */}
    </form>
  );
}
