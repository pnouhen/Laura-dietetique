import RecipeCard from "../../components/Recipe-Card/RecipeCard.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import RecipePagination from "../Recipe-Pagination/RecipePagination.jsx";

import "./recipeList.scss";

/**
 * Liste paginée des recettes.
 * 
 * Affiche les recettes avec options d'édition/suppression si admin.
 * Gère la pagination via RecipePagination.
 * 
 * Props :
 * - paginatedRecipes : tableau des recettes de la page courante
 * - admin : booléen si utilisateur admin
 * - mode : mode d'édition ("delete", "edit" ou autre)
 * - currentPage, totalPages : pagination
 * - isFirstPage, isLastPage : booléens pagination
 * - handlePrev, handleNext : fonctions pagination
 * - onConfirmDelete : fonction suppression recette (admin)
 * - onModifRecipeCard : fonction modification recette (admin) - reçoit maintenant l'ID
 */
export default function RecipeList({
  paginatedRecipes,
  admin,
  mode,
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
  handlePrev,
  handleNext,
  onConfirmDelete,
  onModifRecipeCard,
}) {
  return (
    <section className="recipesList">
      <h2 className="titleRecipesCards">Recettes :</h2>

      {paginatedRecipes.length > 0 ? (
        <>
          <ul className="recipesCardContainer">
            {paginatedRecipes.map(({ id, duration, vegetarian, title, img }) => (
              <li key={id} id={id}>
                {/* Icônes suppression/modification en mode admin */}
                {admin && mode === "delete" && (
                  <i
                    className="fa-solid fa-trash"
                    id={id}
                    onClick={() => onConfirmDelete(id)}
                  ></i>
                )}
                {admin && mode === "edit" && (
                  <i
                    className="fa-solid fa-pen"
                    id={id}
                    onClick={() => onModifRecipeCard(id)}
                  ></i>
                )}

                <RecipeCard
                  id={id}
                  duration={duration}
                  classNameRegime={vegetarian === "Oui" ? "regimeActive" : ""}
                  textRegime={vegetarian === "Oui" ? "Végétarien" : ""}
                  title={title}
                  src={img}
                />
              </li>
            ))}
          </ul>

          <RecipePagination
            currentPage={currentPage}
            totalPages={totalPages}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      ) : (
        <NoData
          text="Nous n'avons pas de recettes disponibles"
          textClass="noRecipesMessage"
        />
      )}
    </section>
  );
}