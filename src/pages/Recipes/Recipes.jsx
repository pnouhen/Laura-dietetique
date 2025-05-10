import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData.jsx";
import { useDetectWidth } from "../../services/useDetectWidth.jsx";

import Header from "../../components/Header/Header.jsx";
import BackgroundImgRecipes from "../../components/BackgroundImgRecipes/BackgroundImgRecipes.jsx";
import ButtonRecipe from "../../components/ButtonRecipe/ButtonRecipe.jsx";
import CardRecipe from "../../components/CardRecipe/CardRecipe.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./recipes.scss";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [buttonRecipe, setbuttonRecipe] = useState([]);
  const [activeButton, setActiveButton] = useState(null); // Aucun bouton sélectionné initialement
  const [index, setIndex] = useState(0); // Indice de la page

  const isMobile = useDetectWidth(768);
  const visibleCardsecipe = isMobile ? 6 : 2;

  useEffect(() => {
    fetchData("/data/recipes.json")
      .then((data) => {
        const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
        setRecipes(sorted);

        const categories = sorted.map((recipe) => recipe.categorie);
        const uniqueCategories = Array.from(
          new Map(categories.map((cat) => [cat.id, cat])).values()
        ).sort((a, b) => a.id - b.id);

        setbuttonRecipe(uniqueCategories);
      })
      .catch((error) => console.error("Error during fetch:", error));
  }, []);

  const handleButtonClick = (id) => {
    setActiveButton(id); // Met à jour le bouton actif
    setIndex(0); // Réinitialise l'index de la pagination lors du changement de catégorie
  };

  // Filtrage des recettes selon la catégorie sélectionnée
  const filteredRecipes =
    activeButton === null
      ? recipes
      : recipes.filter((recipe) => recipe.categorie.id === activeButton);

  // Découper les recettes en pages
  const paginatedRecipes = filteredRecipes.slice(
    index,
    index + visibleCardsecipe
  );

  // Pagination
  const handlePrev = () => setIndex(index - visibleCardsecipe);
  const handleNext = () => setIndex(index + visibleCardsecipe);

  const isFirstPage = index === 0;
  const isLastPage = index + visibleCardsecipe >= filteredRecipes.length;

  const totalPages = Math.ceil(filteredRecipes.length / visibleCardsecipe);
  const currentPage = Math.floor(index / visibleCardsecipe) + 1;
  return (
    <>
      <Header />
      <main className="recipes">
        <BackgroundImgRecipes />
        <section className="choice">
          <h2 className="titleRecipesCards">Choisissez votre :</h2>
          {recipes.length > 0 ? (
            <div className="choice_container">
              <ButtonRecipe
                text="Tous"
                isActive={activeButton === null}
                onClick={() => handleButtonClick(null)}
              />
              {buttonRecipe.map(({ id, text }) => (
                <ButtonRecipe
                  key={id}
                  id={id}
                  text={text}
                  isActive={activeButton === id}
                  onClick={() => handleButtonClick(id)}
                />
              ))}
            </div>
          ) : (
            <NoData
              text="Désolé, nous rencontrons un problème technique."
              textClass=""
            />
          )}
        </section>

        <section className="recipesCards">
          <h2 className="titleRecipesCards">Recettes :</h2>
          {paginatedRecipes.length > 0 ? (
            <>
              {paginatedRecipes.map(
                ({ id, duration, vegetarian, title, img }) => (
                  <CardRecipe
                    key={id}
                    id={id}
                    duration={duration}
                    classNameRegime={vegetarian === true ? "regimeActive" : ""}
                    textRegime={vegetarian === true ? "Végétarien" : ""}
                    title={title}
                    src={img}
                  />
                )
              )}
              <div className="pagination">
                {!isFirstPage && (
                  <button className="pagination-prev" onClick={handlePrev}>
                    <i className="fa-solid fa-chevron-left"></i>
                    <p>Précédant</p>
                  </button>
                )}

                <p className="counter">
                  Page {currentPage} sur {totalPages}
                </p>

                {!isLastPage && (
                  <button className="pagination-next" onClick={handleNext}>
                    <p>Suivant</p>
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                )}
              </div>
            </>
          ) : (
            <NoData
              text="Nous n'avons pas de recettes disponibles"
              textClass="noRecipesMessage"
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
