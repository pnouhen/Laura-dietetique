// Imports React, hooks, services, composants et style
import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData.jsx";
import { useDetectWidth } from "../../services/useDetectWidth.jsx";
import Header from "../../components/Header/Header.jsx";
import ModalMessage from "../../components/ModalMessage/MessageModal.jsx";
import RecipeModalAdd from "../../components/Recipe-ModalAdd/RecipeModalAdd.jsx";
import ButtonSimul from "../../components/ButtonSimul/ButtonSimul.jsx";
import RecipeMenuEditor from "../../components/Recipe-MenuEditor/RecipeMenuEditor.jsx";
import RecipeCategoryFilter from "../../components/Recipe-CategoryFiltrer/Recipe-CategoryFiltrer.jsx";
import RecipeList from "../../components/Recipe-List/RecipeList.jsx";
import RecipeBackground from "../../components/Recipe-Background/RecipeBackground.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import "./recipes.scss";

export default function Recipes() {
  // États principaux
  const [recipes, setRecipes] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [mode, setMode] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [index, setIndex] = useState(0);
  const [toogleModalAdd, setToogleModalAdd] = useState(false);
  const [toogleModalMessage, setToogleModalMessage] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [recipeToDelete, setRecipeToDelete] = useState(null);

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

  const isMobile = useDetectWidth(768);
  const visibleCardsecipe = isMobile ? 6 : 2;

  function handleButtonClick(id) {
    setActiveButton(id);
    setIndex(0);
  }

  const filteredRecipes =
    activeButton === null
      ? recipes
      : recipes.filter((recipe) => recipe.categorie.id === activeButton);

  const paginatedRecipes = filteredRecipes.slice(
    index,
    index + visibleCardsecipe
  );

  const handlePrev = () => setIndex(index - visibleCardsecipe);
  const handleNext = () => setIndex(index + visibleCardsecipe);

  const isFirstPage = index === 0;
  const isLastPage = index + visibleCardsecipe >= filteredRecipes.length;

  const totalPages = Math.ceil(filteredRecipes.length / visibleCardsecipe);
  const currentPage = Math.floor(index / visibleCardsecipe) + 1;

  const isAddNexRecipe = (newRecipe) => {
    const updated = [...recipes, newRecipe].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setRecipes(updated);
  };

  const isUpdateRecipe = (updatedRecipe) => {
    const updated = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ).sort((a, b) => a.title.localeCompare(b.title));
    setRecipes(updated);
  };

  const handleAddRecipe = () => {
    setModalMode("add");
    setEditingRecipe(null);
    setToogleModalAdd(true);
  };

  const handleEditRecipe = (recipeId) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === recipeId);
    if (recipeToEdit) {
      setModalMode("edit");
      setEditingRecipe(recipeToEdit);
      setToogleModalAdd(true);
    }
  };

  const handleCloseModal = () => {
    setToogleModalAdd(false);
    setEditingRecipe(null);
    setModalMode("add");
  };

  const handleConfirmDelete = (recipeId) => {
    setRecipeToDelete(recipeId);
    setToogleModalMessage(true);
  };

  const handleDeleteRecipe = () => {
  const updated = recipes.filter(recipe => recipe.id !== recipeToDelete);

  const newFiltered = activeButton === null
    ? updated
    : updated.filter(recipe => recipe.categorie.id === activeButton);

  const maxIndex = Math.max(0, Math.floor((newFiltered.length - 1) / visibleCardsecipe) * visibleCardsecipe);

  setRecipes(updated);
  setIndex(prev => Math.min(prev, maxIndex)); // Reculer si besoin
  setToogleModalMessage(false);
  setRecipeToDelete(null);
};

  return (
    <>
      <Header />

      {/* Modal d'ajout/modification */}
      {toogleModalAdd && admin && (
        <RecipeModalAdd
          toogleModalAdd={toogleModalAdd === true}
          onClickClose={handleCloseModal}
          isAddNexRecipe={modalMode === "add" ? isAddNexRecipe : isUpdateRecipe}
          mode={modalMode}
          editingRecipe={editingRecipe}
        />
      )}

      {/* Modal de confirmation de suppression */}
      {admin && (
        <ModalMessage
          action={toogleModalMessage}
          onClickClose={() => {
            setToogleModalMessage(false);
            setRecipeToDelete(null);
          }}
          onClickValidate={handleDeleteRecipe}
          classNameValidation={true}
          title="Confirmer la suppression"
          message="Toute suppression est définitive"
        />
      )}

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
            onAddClick={handleAddRecipe}
            onEditClick={() => setMode("edit")}
            onDeleteClick={() => setMode("delete")}
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
          onModifRecipeCard={handleEditRecipe}
          onConfirmDelete={handleConfirmDelete}
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
