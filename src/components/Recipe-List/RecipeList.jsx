import { NavLink } from "react-router-dom";
import RecipeCard from "../../components/Recipe-Card/RecipeCard.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import RecipePagination from "../Recipe-Pagination/RecipePagination.jsx"

import "./recipeList.scss";

export default function RecipeList({ 
  paginatedRecipes, 
  currentPage, 
  totalPages, 
  isFirstPage, 
  isLastPage, 
  handlePrev, 
  handleNext 
}) {
  return (
    <section className="recipesList">
      <h2 className="titleRecipesCards">Recettes :</h2>
      {paginatedRecipes.length > 0 ? (
        <>
          <ul className="recipesCardContainer">
            {paginatedRecipes.map(({ id, duration, vegetarian, title, img }) => (
              <li key={id}>
                <NavLink to={`/recettes/${id}`}>
                  <RecipeCard
                    duration={duration}
                    classNameRegime={vegetarian === true ? "regimeActive" : ""}
                    textRegime={vegetarian === true ? "Végétarien" : ""}
                    title={title}
                    src={img}
                  />
                </NavLink>
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