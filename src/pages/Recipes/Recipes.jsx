// Imports React, hooks, services, composants et style
import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData.jsx";
import { useDetectWidth } from "../../services/useDetectWidth.jsx";
import {
  handleAddRecipe,
  onModifRecipeCard,
  confirmDelete,
  handleDelete,
} from "../../services/functionsRecipeAdmin.jsx";

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
  const [admin, setAdmin] = useState(false); // mode admin actif ou non
  const [mode, setMode] = useState(null); // 'view', 'delete', 'edit'
  const [buttons, setButtons] = useState([]); // boutons de filtre par catégorie
  const [activeButton, setActiveButton] = useState(null); // id de la catégorie active
  const [index, setIndex] = useState(0); // index de pagination
  const [isModalOpen, setIsModalOpen] = useState(false); // modal d'ajout ouverte ?
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false); // modal de suppression ?
  const [recipeToDeleteId, setRecipeToDeleteId] = useState(null); // id recette à supprimer

  // Chargement des données au montage
  useEffect(() => {
    fetchData("/data/recipes.json")
      .then((data) => {
        const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
        setRecipes(sorted);

        // Extraction des catégories uniques
        const categories = sorted.map((recipe) => recipe.categorie);
        const uniqueCategories = Array.from(
          new Map(categories.map((cat) => [cat.id, cat])).values()
        ).sort((a, b) => a.id - b.id);

        setButtons(uniqueCategories);
      })
      .catch((error) => console.error("Error during fetch:", error));
  }, []);
  
  // Responsive : nombre de cartes à afficher selon la largeur
  const isMobile = useDetectWidth(768);
  const visibleCardsecipe = isMobile ? 6 : 2;

  // Sélection d’un filtre de catégorie
  function handleButtonClick(id) {
    setActiveButton(id);
    setIndex(0); // reset pagination
  }

  // Filtrage des recettes selon la catégorie active
  const filteredRecipes =
    activeButton === null
      ? recipes
      : recipes.filter((recipe) => recipe.categorie.id === activeButton);

  // Pagination des recettes
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

  // Toggle modal d'ajout/modif recette
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <Header />

      {/* Modal d'ajout + confirmation suppression (admin uniquement) */}
      {isModalOpen && admin && (
        <>
          <RecipeModalAdd
            onClose={toggleModal}
            onAddRecipe={(newRecipe) =>
              handleAddRecipe(newRecipe, recipes, setRecipes)
            }
            mode={mode}
          />
          <ModalMessage
            action={modalConfirmDelete}
            title="Confirmer la suppression"
            message="Toute suppression est définitive"
            classNameValidation={true}
            onClickClose={() => setModalConfirmDelete(false)}
            onClickValidate={() =>
              handleDelete(
                recipes,
                recipeToDeleteId,
                setRecipes,
                activeButton,
                visibleCardsecipe,
                index,
                setIndex,
                setRecipeToDeleteId,
                setModalConfirmDelete
              )
            }
          />
        </>
      )}

      <main className="recipes">
        {/* Toggle admin/user */}
        <ButtonSimul
          className="admin"
          text={admin ? "User" : "Admin"}
          onClick={() => {
            setAdmin(!admin);
            setMode(null);
          }}
        />

        <RecipeBackground />

        {/* Menu admin (ajout, modif, suppression) */}
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

        {/* Filtres par catégorie */}
        <RecipeCategoryFilter
          buttons={buttons}
          activeButton={activeButton}
          handleButtonClick={handleButtonClick}
          recipes={recipes}
        />

        {/* Liste des recettes paginée */}
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
          onConfirmDelete={(id) =>
            admin &&
            confirmDelete(id, setRecipeToDeleteId, setModalConfirmDelete)
          }
          onModifRecipeCard={() => admin && onModifRecipeCard(toggleModal)}
        />
      </main>

      <Footer />
    </>
  );
}
