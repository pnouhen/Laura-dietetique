import { useEffect, useState } from "react";
import { fetchData } from "../../services/fetchData";

import LabelInput from "../LabelInput/LabelInput";
import LabelSelect from "../LabelSelect/LabelSelect";

import "./recipeModalAddGeneral.scss";

export default function RecipeModalAddGeneral() {
  const [addRecipe, setAddRecipe] = useState();
  useEffect(() => {
    fetchData("/data/addRecipe.json")
      .then((data) => {
        setAddRecipe(data);
      })
      .catch((error) => console.log("Erro during fetech", error));
  }, []);

  if (!addRecipe) {
    return <p></p>;
  }

  return (
      <form className="modalAddGeneral" action="">
        <LabelInput
          className="labelInputModalAdd"
          htmlFor="title"
          label="Titre de la recette"
          type="text"
          id="title"
        />
        <LabelSelect title="Catégorie" id="categorie" data={addRecipe.categories} />
        <LabelSelect title="Durée" id="duration" data={addRecipe.durations} />
        <LabelSelect title="Végétarien" id="vegetarian" data={addRecipe.vegetarian} />
      </form>
  );
}
