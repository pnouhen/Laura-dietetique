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

  // Mise à jour d'un champ spécifique
  const handleChange = (field) => (e) => {
    setIngredient((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = parseFloat(ingredient.quantity);
    if (!ingredient.name || isNaN(quantity) || !ingredient.dosage) return;

    // Ajout de l'ingrédient à la liste
    onChange([...value, { ...ingredient, quantity }]);

    // Réinitialisation du formulaire
    setIngredient({ name: "", quantity: "", dosage: "" });
  };

  // Configuration des champs du formulaire
  const inputs = [
    {
      component: LabelInput,
      props: {
        className: "name",
        htmlFor: "name",
        label: "Nom de l'ingrédient",
        type: "text",
        id: "name",
        value: ingredient.name,
        onChange: handleChange("name"),
      },
    },
    {
      component: LabelInput,
      props: {
        className: "quantity",
        htmlFor: "quantity",
        label: "Quantité",
        type: "number",
        id: "quantity",
        value: ingredient.quantity,
        onChange: handleChange("quantity"),
      },
    },
    {
      component: LabelSelect,
      props: {
        className: "dosage",
        title: "Dosage",
        id: "dosage",
        data: data.dosage,
        value: ingredient.dosage,
        onChange: handleChange("dosage"),
      },
    },
  ];

  return (
    <div className="createIngredient">
      <h3>Ajouter un ingrédient</h3>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => {
          const Comp = input.component;
          return <Comp key={input.props.id} {...input.props} />;
        })}
        <Button
          text="+ Ajouter"
          className="buttonAddIngredient"
          type="submit"
        />
      </form>
    </div>
  );
}
