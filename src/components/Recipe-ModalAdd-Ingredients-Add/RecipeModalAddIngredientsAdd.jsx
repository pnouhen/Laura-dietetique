import { useState } from "react";
import LabelInput from "../LabelInput/LabelInput";
import LabelSelect from "../LabelSelect/LabelSelect";
import Button from "../Button/Button";

import "./recipeModalAddIngredientsAdd.scss";

export default function RecipeModalAddIngredientsAdd({
  value,
  onChange,
  data,
}) {
  const [ingredient, setIngredient] = useState({
    name: "",
    quantity: "",
    dosage: "",
  });

  function handleAddIngredient(e) {
    e.preventDefault();
    const quantity = parseFloat(ingredient.quantity);

    if (!ingredient.name || isNaN(quantity) || !ingredient.dosage) return;

    onChange([...value, { ...ingredient, quantity }]);
    setIngredient({ name: "", quantity: "", dosage: "" });
  }
  return (
    <div className="createIngredients">
      <h3>Créer un ingrédient</h3>
      <form onSubmit={handleAddIngredient}>
        <LabelInput
          className="name"
          htmlFor="name"
          label="Nom de l'ingrédient"
          value={ingredient.name}
          onChange={(e) =>
            setIngredient({ ...ingredient, name: e.target.value })
          }
          type="text"
          id="name"
        />
        <LabelInput
          className="quantity"
          htmlFor="quantity"
          label="Quantité"
          value={ingredient.quantity}
          onChange={(e) =>
            setIngredient({ ...ingredient, quantity: e.target.value })
          }
          type="number"
          id="quantity"
        />
        <LabelSelect
          className="dosage"
          title="Dosage"
          id="dosage"
          data={data.dosage}
          value={ingredient.dosage}
          onChange={(e) =>
            setIngredient({ ...ingredient, dosage: e.target.value })
          }
        />
        <Button
          text="+ Ajouter"
          className="buttonAddIngredient"
          type="submit"
        />
      </form>
    </div>
  );
}
