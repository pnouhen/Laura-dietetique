import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData.jsx";
import { useDetectWidth } from "../../services/useDetectWidth.jsx";

import Header from "../../components/Header/Header.jsx";
import RecipeModalAdd from "../../components/Recipe-ModalAdd/RecipeModalAdd.jsx";
import ButtonSimul from "../../components/ButtonSimul/ButtonSimul.jsx";
import RecipeMenuEditor from "../../components/Recipe-MenuEditor/RecipeMenuEditor.jsx";
import RecipeCategoryFilter from "../../components/Recipe-CategoryFiltrer/Recipe-CategoryFiltrer.jsx";
import RecipeList from "../../components/Recipe-List/RecipeList.jsx";
import RecipeBackground from "../../components/Recipe-Background/RecipeBackground.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import "./recipes.scss";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [mode, setMode] = useState(null); // 'view', 'delete', 'edit'
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

  // Mode Edition
  const handleDelete = (id) => {
    const updated = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updated);

    const filteredUpdated =
      activeButton === null
        ? updated
        : updated.filter((r) => r.categorie.id === activeButton);

    const maxIndex = Math.max(
      0,
      Math.floor((filteredUpdated.length - 1) / visibleCardsecipe) *
        visibleCardsecipe
    );

    if (index > maxIndex) {
      setIndex(maxIndex);
    }
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
      {/* <RecipeModalAdd /> */}
      <main className="recipes">
        <ButtonSimul
          className="admin"
          text={admin ? "User" : "Admin"}
          onClick={() => {
            setAdmin(!admin);
            setMode(null);
          }}
        />
        <RecipeBackground />

        {admin && (
          <RecipeMenuEditor
            mode={mode}
            onAddClick={() => setMode("view")}
            onDeleteClick={() => setMode("delete")}
            onEditClick={() => setMode("edit")}
          />
        )}

        <RecipeCategoryFilter
          buttons={buttons}
          activeButton={activeButton}
          handleButtonClick={handleButtonClick}
          recipes={recipes}
        />

        <RecipeList
          paginatedRecipes={paginatedRecipes}
          admin={admin}
          mode={mode}
          currentPage={currentPage}
          totalPages={totalPages}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleDelete={handleDelete}
        />
      </main>
      <Footer />
    </>
  );
}
