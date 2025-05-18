import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData";

import ModalClose from "../ModalClose/ModalClose";
import RecipeModalAddNavItem from "../Recipe-ModalAdd-NavItem/RecipeModalAddNavItem";
import RecipeModalAddGeneral from "../Recipe-ModalAdd-General/RecipeModalAddGeneral";
import RecipeModalAddIngredients from "../Recipe-ModalAdd-Ingredients/RecipeModalAddIngredients";

import "./recipeModalAdd.scss";

export default function RecipeModalAdd() {
  const [index, setIndex] = useState(0);
  const [valueAdd, setValueAdd] = useState({
    title: "",
    categorie: "",
    duration: "",
    vegetarian: "",
    img: "",
    ingredients: [],
  });
  const isvalueAddComplete =
    valueAdd.title &&
    valueAdd.categorie &&
    valueAdd.duration &&
    valueAdd.duration !== "";

  const [addRecipe, setAddRecipe] = useState();
  useEffect(() => {
    fetchData("/data/infoAddRecipe.json")
      .then((data) => {
        setAddRecipe(data);
      })
      .catch((error) => console.log("Erro during fetech", error));
  }, []);

  function isImgRemove() {
    setValueAdd((prev) => ({ ...prev, img: "" }));
  }

function handleDeleteIngredient(indexToDelete) {
  setValueAdd(prev => ({
    ...prev,
    ingredients: prev.ingredients.filter((_, index) => index !== indexToDelete)
  }));
}

  if (!addRecipe) {
    return <p></p>;
  }

  return (
    <section className="modalAdd">
      <div className="modalAdd_container">
        <h2>Ajouter une recette</h2>
        <ModalClose />
        <div className="modalNav">
          <RecipeModalAddNavItem
            text="Général"
            action={
              (index === 0 && "active ") + (isvalueAddComplete && " complete")
            }
            onClick={() => setIndex(0)}
          />
          <RecipeModalAddNavItem
            text="Ingrédients"
            action={index == 1 && "active"}
            onClick={() => setIndex(1)}
          />
          <RecipeModalAddNavItem
            text="Ustensils"
            action={index == 2 && "active"}
            onClick={() => setIndex(2)}
          />
          <RecipeModalAddNavItem
            text="Etapes"
            action={index == 3 && "active"}
            onClick={() => setIndex(3)}
          />
        </div>
        {index == 0 && (
          <RecipeModalAddGeneral
            title={valueAdd.title}
            data={addRecipe}
            categorie={valueAdd.categorie}
            duration={valueAdd.duration}
            vegetarian={valueAdd.vegetarian}
            img={valueAdd.img}
            setData={setValueAdd}
            onclickCloseImg={isImgRemove}
          />
        )}
        {index == 1 && (
          <RecipeModalAddIngredients
            value={valueAdd.ingredients}
            onChange={(newIngredients) =>
              setValueAdd((prev) => ({ ...prev, ingredients: newIngredients }))
            }
            data={addRecipe}
            onDelete={handleDeleteIngredient}
          />
        )}
      </div>
    </section>
  );
}
