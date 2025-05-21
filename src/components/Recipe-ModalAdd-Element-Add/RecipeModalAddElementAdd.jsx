import { useState } from "react";
import LabelInput from "../LabelInput/LabelInput";
import Button from "../Button/Button";

import "./recipeModalAddElementAdd.scss";

export default function RecipeModalAddElementAdd({
  titleAdd,
  titleLabel,
  value,
  onChange,
}) {
  const [element, setElement] = useState({
    name: "",
  });

  const handleAddElement = (e) => {
    e.preventDefault();

    // Vérification que le nom n'est pas vide
    if (element.name.trim() === "") {
      return;
    }

    // Ajout du nouvel élément à la liste existante
    const newElements = [...value, element];

    // Mise à jour des données via le prop onChange
    onChange(newElements);

    // Réinitialisation du formulaire
    setElement({ name: "" });
  };

  return (
    <div className="createElement">
      <h3>{titleAdd}</h3>
      <form onSubmit={handleAddElement} className="">
        <LabelInput
          htmlFor="name"
          label={titleLabel}
          type="text"
          id="name"
          value={element.name}
          onChange={(e) => setElement({ ...element, name: e.target.value })}
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
