import { useState } from "react";

import RecipeModalAddNavItem from "../Recipe-ModalAdd-NavItem/RecipeModalAddNavItem";
import RecipeModalAddGeneral from "../Recipe-ModalAdd-General/RecipeModalAddGeneral";
import Button from "../Button/Button";

import "./recipeModalAdd.scss";

export default function RecipeModalAdd() {
  const [index, setIndex] = useState(0);

  return (
    <section className="modalAdd">
      <div className="modalAdd_container">
        <h2>Ajouter une recette</h2>
        <div className="modalNav">
          <RecipeModalAddNavItem
            text="Général"
            action={index == 0 && "active"}
            onClick={() => setIndex(0)}
          />
          <RecipeModalAddNavItem
            text="Ingrédients"
            action={index == 1 && "active"}
            onClick={() => setIndex(1)}
          />
          <RecipeModalAddNavItem
            text="Ustensils"
            action={index == 2 && "active"}
            onClick={() => setIndex(2)}
          />
          <RecipeModalAddNavItem
            text="Etapes"
            action={index == 3 && "active"}
            onClick={() => setIndex(3)}
          />
        </div>
        {index == 0 && <RecipeModalAddGeneral />}
        {/* Cette page doit pourvoir garder les infos taper dans chaque partie + voir un code couleur pour confirmer la fin d'une partie */}
        <Button className="recipeAdd" text="Valider" />
      </div>
    </section>
  );
}
