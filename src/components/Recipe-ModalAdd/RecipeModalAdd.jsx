import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData";

import ModalClose from "../ModalClose/ModalClose";
import RecipeModalAddNavItem from "../Recipe-ModalAdd-NavItem/RecipeModalAddNavItem";
import RecipeModalAddGeneral from "../Recipe-ModalAdd-General/RecipeModalAddGeneral";
import RecipeModalAddIngredients from "../Recipe-ModalAdd-Ingredients/RecipeModalAddIngredients";
import RecipeModalAddElement from "../Recipe-ModalAdd-Element/RecipeModalAddElement";
import Button from "../Button/Button";

import "./recipeModalAdd.scss";

export default function RecipeModalAdd({ onClose, onAddRecipe }) {
  const [index, setIndex] = useState(0);
  const [addRecipe, setAddRecipe] = useState(null);
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

  const handleSaveRecipe = () => {
    const newRecipe = {
      ...valueAdd,
      id: Date.now(), // ou un autre identifiant unique
    };

    // callback reçu en prop
    onAddRecipe(newRecipe);

    // Réinitialise l'état
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
    setIndex(0);
  };

  const isGeneralComplete =
    valueAdd.title && valueAdd.categorie && valueAdd.duration && valueAdd.img;
  const isAllListsComplete =
    valueAdd.ingredients.length > 0 &&
    valueAdd.ustensils.length > 0 &&
    valueAdd.steps.length > 0;

  const showSaveButton = isGeneralComplete && isAllListsComplete;

  useEffect(() => {
    fetchData("/data/infoAddRecipe.json")
      .then(setAddRecipe)
      .catch((error) => console.log("Error during fetch", error));
  }, []);

  const removeImage = () => {
    setValueAdd((prev) => ({ ...prev, img: "" }));
  };

  const handleDeleteElement = (elementName, indexToDelete) => {
    setValueAdd((prev) => ({
      ...prev,
      [elementName]: prev[elementName].filter((_, i) => i !== indexToDelete),
    }));
  };

  if (!addRecipe) return null;

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
    <section className="modalAdd" onClick={onClose}>
      <div className="modalAdd_container" onClick={(e) => e.stopPropagation()}>
        <h2>Ajouter une recette</h2>
        <ModalClose onClick={onClose} />

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

        {tabs[index].component}

        <Button
          text="Enregister la recette"
          className={!showSaveButton ? "displayNone" : "addRecipes"}
          onClick={() => {
            handleSaveRecipe();
            onClose();
          }}
        />
      </div>
    </section>
  );
}
