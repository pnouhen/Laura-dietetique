import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData";

import RecipeModalAddNavItem from "../Recipe-ModalAdd-NavItem/RecipeModalAddNavItem";
import RecipeModalAddGeneral from "../Recipe-ModalAdd-General/RecipeModalAddGeneral";
import RecipeModalAddTableau from "../Recipe-ModalAdd-Tableau/RecipeModalAddTableau";
import Button from "../Button/Button";

import "./recipeModalAdd.scss";

export default function RecipeModalAdd() {
  const [index, setIndex] = useState(0);
  const [valueGeneral, setValueGeneral] = useState({
    title: "",
    categorie: "",
    duration: "",
    vegetarian: "",
  });
  const isValueGeneralComplete =
    valueGeneral.title &&
    valueGeneral.categorie &&
    valueGeneral.duration &&
    valueGeneral.duration !== "";

const [addRecipe, setAddRecipe] = useState();
  useEffect(() => {
    fetchData("/data/addRecipe.json")
      .then((data) => {
        setAddRecipe(data);
      })
      .catch((error) => console.log("Erro during fetech", error));
  }, []);

  if (!addRecipe) {
    return <p></p>;
  }

  return (
    <section className="modalAdd">
      <div className="modalAdd_container">
        <h2>Ajouter une recette</h2>
        <div className="modalNav">
          <RecipeModalAddNavItem
            text="Général"
            action={
              (index === 0 && "active ") +
              (isValueGeneralComplete && " complete")
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
            title={valueGeneral.title}
            data={addRecipe}
            categorie={valueGeneral.categorie}
            duration={valueGeneral.duration}
            vegetarian={valueGeneral.vegetarian}
            setValueGeneral={setValueGeneral}
          />
        )}
        {index == 1 && (
          <RecipeModalAddTableau titleCreate="Créer un ingrédient" data={addRecipe}/>
        )}
        <Button className="recipeAdd" text="Valider" />
      </div>
    </section>
  );
}
