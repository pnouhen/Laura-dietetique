// Ajoute une recette, génère un ID à partir du titre, trie la liste et met à jour l’état
export function handleAddRecipe(newRecipe, recipes, setRecipes) {
  const id = newRecipe.title.toLowerCase().replace(/\s+/g, "-");
  const recipeWithId = { ...newRecipe, id };

  const updatedRecipes = [...recipes, recipeWithId].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  setRecipes(updatedRecipes);
}

// Ouvre la modale de modification (même que pour ajout)
export function onModifRecipeCard(toggleModal) {
  toggleModal();
}

// Prépare la suppression d’une recette en ouvrant une modale de confirmation
export function confirmDelete(
  recipeId,
  setRecipeToDeleteId,
  setModalConfirmDelete
) {
  setRecipeToDeleteId(recipeId);
  setModalConfirmDelete(true);
}

// Supprime une recette, ajuste la pagination et ferme la modale de confirmation
export function handleDelete(
  recipes,
  recipeToDeleteId,
  setRecipes,
  activeButton,
  visibleCardsecipe,
  index,
  setIndex,
  setRecipeToDeleteId,
  setModalConfirmDelete
) {
  if (!recipeToDeleteId) return;

  // Suppression de la recette
  const updated = recipes.filter((recipe) => recipe.id !== recipeToDeleteId);
  setRecipes(updated);

  // Recalcul des recettes visibles selon le filtre actif
  const filteredUpdated =
    activeButton === null
      ? updated
      : updated.filter((r) => r.categorie.id === activeButton);

  // Réajuste l’index de pagination si nécessaire
  const maxIndex = Math.max(
    0,
    Math.floor((filteredUpdated.length - 1) / visibleCardsecipe) *
      visibleCardsecipe
  );

  if (index > maxIndex) {
    setIndex(maxIndex);
  }

  // Nettoyage de l’état
  setRecipeToDeleteId(null);
  setModalConfirmDelete(false);
}
