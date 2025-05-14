import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData.jsx";
import { useDetectWidth } from "../../services/useDetectWidth.jsx";

import Header from "../../components/Header/Header.jsx";
import RecipeBackground from "../../components/Recipe-Background/RecipeBackground.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import RecipeCategoryFilter from "../../components/Recipe-CategoryFiltrer/Recipe-CategoryFiltrer.jsx";
import RecipeList from "../../components/Recipe-List/RecipeList.jsx";

import "./recipes.scss";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [index, setIndex] = useState(0);

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

        setButtons(uniqueCategories);
      })
      .catch((error) => console.error("Error during fetch:", error));
  }, []);

  const handleButtonClick = (id) => {
    setActiveButton(id);
    setIndex(0);
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
        <RecipeBackground />
        <RecipeCategoryFilter 
          buttons={buttons} 
          activeButton={activeButton} 
          handleButtonClick={handleButtonClick} 
          recipes={recipes}
        />
        <RecipeList
          paginatedRecipes={paginatedRecipes}
          currentPage={currentPage}
          totalPages={totalPages}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </main>
      <Footer />
    </>
  );
}