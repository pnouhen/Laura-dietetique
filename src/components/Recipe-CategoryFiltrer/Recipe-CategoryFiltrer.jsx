import Button from "../Button/Button.jsx";
import NoData from "../NoData/NoData.jsx";

import "./recipeCategoryFiltrer.scss";

/**
 * Composant de filtre par catégorie pour les recettes.
 * 
 * Affiche un bouton "Tous" et une liste de boutons de catégories.
 * Permet de sélectionner une catégorie active via handleButtonClick.
 * Affiche un message NoData si la liste de recettes est vide.
 * 
 * Props :
 * - buttons : tableau des catégories { id, text }
 * - activeButton : id de la catégorie active (ou null pour "Tous")
 * - handleButtonClick : fonction appelée au clic sur un bouton
 * - recipes : tableau des recettes (pour condition d'affichage)
 */

export default function RecipeCategoryFilter({ buttons, activeButton, handleButtonClick, recipes }) {
  return (
    <section className="choice">
      <h2 className="titleRecipesCards">Catégories</h2>

      {recipes.length > 0 ? (
        <div className="choice_container">
          {/* Bouton "Tous" pour afficher toutes les recettes */}
          <Button
            text="Tous"
            className={`buttonRecipe ${activeButton === null ? "buttonRecipeActive" : ""}`}
            onClick={() => handleButtonClick(null)}
          />

          {/* Boutons des catégories dynamiques */}
          {buttons.map(({ id, text }) => (
            <Button
              key={id}
              id={id}
              text={text}
              className={`buttonRecipe ${activeButton === id ? "buttonRecipeActive" : ""}`}
              onClick={() => handleButtonClick(id)}
            />
          ))}
        </div>
      ) : (
        /* Message affiché si aucune recette disponible */
        <NoData
          text="Désolé, nous rencontrons un problème technique."
          textClass=""
        />
      )}
    </section>
  );
}
