import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData";

import ModalClose from "../ModalClose/ModalClose";
import RecipeModalAddNavItem from "../Recipe-ModalAdd-NavItem/RecipeModalAddNavItem";
import RecipeModalAddGeneral from "../Recipe-ModalAdd-General/RecipeModalAddGeneral";
import RecipeModalAddIngredients from "../Recipe-ModalAdd-Ingredients/RecipeModalAddIngredients";
import RecipeModalAddElement from "../Recipe-ModalAdd-Element/RecipeModalAddElement";
import Button from "../Button/Button";

import "./recipeModalAdd.scss";

export default function RecipeModalAdd({ 
  isAddNexRecipe, 
  onClickClose, 
  mode = "add", 
  editingRecipe = null 
}) {
  // États de la modal
  const [index, setIndex] = useState(0); // Index de l'onglet actif
  const [addRecipe, setAddRecipe] = useState(null); // Données de configuration chargées depuis le JSON
  const [valueAdd, setValueAdd] = useState({
    title: "",
    categorie: "",
    duration: "",
    vegetarian: "",
    img: "",
    ingredients: [],
    ustensils: [],
    steps: [],
  });
  /**
   * Pré-remplit le formulaire en mode édition
   * Réinitialise le formulaire en mode ajout
   */
  useEffect(() => {
    if (mode === "edit" && editingRecipe) {
      // Mode édition : pré-remplir avec les données existantes
      setValueAdd({
        title: editingRecipe.title || "",
        categorie: editingRecipe.categorie || "",
        duration: editingRecipe.duration || "",
        vegetarian: editingRecipe.vegetarian || "",
        img: editingRecipe.img || "",
        ingredients: editingRecipe.ingredients || [],
        ustensils: editingRecipe.ustensils || [],
        steps: editingRecipe.steps || [],
      });
    } else {
      // Mode ajout : formulaire vide
      setValueAdd({
        title: "",
        categorie: "",
        duration: "",
        vegetarian: "",
        img: "",
        ingredients: [],
        ustensils: [],
        steps: [],
      });
    }
  }, [mode, editingRecipe]);

  /**
   * Sauvegarde la recette (ajout ou modification)
   * Ferme la modal après sauvegarde
   */
  const handleSaveRecipe = () => {
    let recipeToSave;
    
    if (mode === "edit" && editingRecipe) {
      // Mode modification : conserver l'ID existant
      recipeToSave = { ...valueAdd, id: editingRecipe.id };
    } else {
      // Mode ajout : générer un nouvel ID basé sur le timestamp
      recipeToSave = { ...valueAdd, id: Date.now() };
    }
    
    // Appel de la fonction parent pour sauvegarder
    isAddNexRecipe(recipeToSave);
    
    // Réinitialisation uniquement en mode ajout
    if (mode === "add") {
      setValueAdd({
        title: "",
        categorie: "",
        duration: "",
        vegetarian: "",
        img: "",
        ingredients: [],
        ustensils: [],
        steps: [],
      });
    }
    
    // Retour au premier onglet et fermeture de la modal
    setIndex(0);
    onClickClose();
  };

  /**
   * Validation des champs requis
   */
  // Vérification des champs obligatoires de l'onglet "Général"
  const isGeneralComplete =
    valueAdd.title && 
    valueAdd.categorie && 
    valueAdd.duration && 
    valueAdd.img;

  // Vérification que toutes les listes ont au moins un élément
  const isAllListsComplete =
    valueAdd.ingredients.length > 0 &&
    valueAdd.ustensils.length > 0 &&
    valueAdd.steps.length > 0;

  // Le bouton n'apparaît que si tout est complété
  const showSaveButton = isGeneralComplete && isAllListsComplete;

  /**
   * Chargement des données de configuration au montage du composant
   */
  useEffect(() => {
    fetchData("/data/infoAddRecipe.json")
      .then(setAddRecipe)
      .catch((error) => console.log("Error during fetch", error));
  }, []);

  /**
   * Supprime l'image de la recette
   */
  const removeImage = () => {
    setValueAdd((prev) => ({ ...prev, img: "" }));
  };

  const handleDeleteElement = (elementName, indexToDelete) => {
    setValueAdd((prev) => ({
      ...prev,
      [elementName]: prev[elementName].filter((_, i) => i !== indexToDelete),
    }));
  };

  // Chargement en cours - affichage d'attente
  if (!addRecipe) return null;

  /**
   * Configuration des onglets de la modal
   */
  const tabs = [
    {
      label: "Général",
      complete: isGeneralComplete,
      component: (
        <RecipeModalAddGeneral
          title={valueAdd.title}
          data={addRecipe}
          categorie={valueAdd.categorie}
          duration={valueAdd.duration}
          vegetarian={valueAdd.vegetarian}
          img={valueAdd.img}
          setData={setValueAdd}
          onclickCloseImg={removeImage}
        />
      ),
    },
    {
      label: "Ingrédients",
      complete: valueAdd.ingredients.length > 0,
      component: (
        <RecipeModalAddIngredients
          className="addColumns"
          value={valueAdd.ingredients}
          onChange={(newIngredients) =>
            setValueAdd((prev) => ({ ...prev, ingredients: newIngredients }))
          }
          data={addRecipe}
          onDelete={(index) => handleDeleteElement("ingredients", index)}
        />
      ),
    },
    {
      label: "Ustensils",
      complete: valueAdd.ustensils.length > 0,
      component: (
        <RecipeModalAddElement
          titleAdd="Créer un ustensil"
          titleLabel="Nom de l'ustensil"
          titleList="Liste des ustensils"
          className="addColumns"
          classNameAdd="addColumns createElement"
          value={valueAdd.ustensils}
          onChange={(newUstensils) =>
            setValueAdd((prev) => ({ ...prev, ustensils: newUstensils }))
          }
          data={addRecipe}
          onDelete={(index) => handleDeleteElement("ustensils", index)}
        />
      ),
    },
    {
      label: "Étapes",
      complete: valueAdd.steps.length > 0,
      component: (
        <RecipeModalAddElement
          titleAdd="Créer une étape"
          titleLabel="Nom de l'étape"
          titleList="Liste des étapes"
          className="steps"
          value={valueAdd.steps}
          onChange={(newSteps) =>
            setValueAdd((prev) => ({ ...prev, steps: newSteps }))
          }
          data={addRecipe}
          onDelete={(index) => handleDeleteElement("steps", index)}
        />
      ),
    },
  ];

  return (
    <section className="modalAdd" onClick={onClickClose}>
      <div className="modalAdd_container" onClick={(e) => e.stopPropagation()}>
        <h2>{mode === "edit" ? "Modifier une recette" : "Ajouter une recette"}</h2>
        <ModalClose onClick={onClickClose}/>

        {/* Navigation des onglets */}
        <div className="modalNav">
          {tabs.map((tab, i) => (
            <RecipeModalAddNavItem
              key={tab.label}
              text={tab.label}
              action={`${index === i ? "active " : ""}${
                tab.complete ? "complete" : ""
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        {/* Contenu dynamique selon l'onglet */}
        {tabs[index].component}

        {/* Bouton d'enregistrement - n'apparaît que si le formulaire est complet */}
        {showSaveButton && (
          <Button
            text={mode === "edit" ? "Modifier la recette" : "Enregistrer la recette"}
            className="saveRecipe"
            onClick={handleSaveRecipe}
          />
        )}
      </div>
    </section>
  );
}