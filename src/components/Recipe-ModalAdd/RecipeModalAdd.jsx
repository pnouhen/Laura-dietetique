import { useState } from "react";

import RecipeModalAddNavItem from "../Recipe-ModalAdd-NavItem/RecipeModalAddNavItem";
import RecipeModalAddGeneral from "../Recipe-ModalAdd-General/RecipeModalAddGeneral";

import "./recipeModalAdd.scss";

export default function RecipeModalAdd() {
  const [activeCategorie, setActiveCategorie] = useState(null);
  
  return (
    <section className="modalAdd">
      <div className="modalAdd_container">
        <h2>Ajouter une recette</h2>
        <nav>
          <RecipeModalAddNavItem
            onClick={() => setActiveCategorie(null)}
            action={activeCategorie === null ? "buttonRecipeActive" : ""}
            text="Général"
          />
          <RecipeModalAddNavItem
            onClick={() => setActiveCategorie("ingredients")}
            action={
              activeCategorie === "ingredients" ? "buttonRecipeActive" : ""
            }
            text="Ingrédients"
          />
          <RecipeModalAddNavItem
            onClick={() => setActiveCategorie("ustensils")}
            action={activeCategorie === "ustensils" ? "buttonRecipeActive" : ""}
            text="Ustensils"
          />
          <RecipeModalAddNavItem
            onClick={() => setActiveCategorie("steps")}
            action={activeCategorie === "steps" ? "buttonRecipeActive" : ""}
            text="Etapes"
          />
        </nav>
        {activeCategorie == null && <RecipeModalAddGeneral />}
      </div>
    </section>
  );
}
