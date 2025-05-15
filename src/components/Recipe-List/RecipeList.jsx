import RecipeCard from "../../components/Recipe-Card/RecipeCard.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import RecipePagination from "../Recipe-Pagination/RecipePagination.jsx";

import "./recipeList.scss";

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
  handleDelete,
}) {
  return (
    <section className="recipesList">
      <h2 className="titleRecipesCards">Recettes :</h2>
      {paginatedRecipes.length > 0 ? (
        <>
          <ul className="recipesCardContainer">
            {paginatedRecipes.map(
              ({ id, duration, vegetarian, title, img }) => (
                <li key={id} id={id}>
                  {admin && mode === "delete" && (
                    <i className="fa-solid fa-trash" id={id} onClick={() => handleDelete(id)}></i>
                  )}
                  {admin && mode === "edit" && (
                    <i className="fa-solid fa-pen" id={id}></i>
                  )}
                  <RecipeCard
                    id={id}
                    duration={duration}
                    classNameRegime={vegetarian === true ? "regimeActive" : ""}
                    textRegime={vegetarian === true ? "Végétarien" : ""}
                    title={title}
                    src={img}
                  />
                </li>
              )
            )}
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
