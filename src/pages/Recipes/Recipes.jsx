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
  const [recipes, setRecipes] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [mode, setMode] = useState(null); // 'view', 'delete', 'edit'
  const [buttons, setButtons] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useDetectWidth(768);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const visibleCardsecipe = isMobile ? 6 : 2;
  const [recipeToDeleteId, setRecipeToDeleteId] = useState(null);
  
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  
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
  const handleAddRecipe = (newRecipe) => {
    const id = newRecipe.title.toLowerCase().replace(/\s+/g, "-");
    const recipeWithId = { ...newRecipe, id };

    const updatedRecipes = [...recipes, recipeWithId].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    setRecipes(updatedRecipes);
  };

  const onModifRecipeCard =() => {
    toggleModal()
  }

  const confirmDelete = (recipeId) => {
    setRecipeToDeleteId(recipeId);
    setModalConfirmDelete(true);
  };

  const handleDelete = () => {
    if (!recipeToDeleteId) return;

    const updated = recipes.filter((recipe) => recipe.id !== recipeToDeleteId);
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

    setRecipeToDeleteId(null); // nettoyage après suppression
    setModalConfirmDelete(false); // fermeture de la modale
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
      {isModalOpen && (
        <RecipeModalAdd onClose={toggleModal} onAddRecipe={handleAddRecipe} mode={mode}/>
      )}
      <ModalMessage
        action={modalConfirmDelete}
        title="Confirmer la suppression"
        message="Toute suppression est définitive"
        classNameValidation={true}
        onClickClose={() => setModalConfirmDelete(false)}
        onClickValidate={handleDelete}
      />
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
            onAddClick={() => {
              setMode("view");
              toggleModal();
            }}
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
          onConfirmDelete={confirmDelete}
          onModifRecipeCard={onModifRecipeCard}
        />
      </main>
      <Footer />
    </>
  );
}