import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchData } from "../../services/fetchData";

import Header from "../Header/Header";
import ButtonSimul from "../ButtonSimul/ButtonSimul.jsx";
import BackgroundImgRecipes from "../../components/BackgroundImgRecipes/BackgroundImgRecipes.jsx";
import NoData from "../NoData/NoData.jsx";
import Footer from "../Footer/Footer";

import "./recipesDetails.scss";

export default function RecipesDetails() {
  const [recipeSelect, setRecipeSelect] = useState(null);
  const [purchasedRecipe, setPurchasedRecipe] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchData("/data/recipes.json")
      .then((data) => {
        const recipe = data.find((item) => item.id === id);
        setRecipeSelect(recipe);
      })
      .catch((err) => console.error(err));
  }, [id]);
  console.log(purchasedRecipe);
  return (
    <>
      <Header />
      <main className="recipesDetails">
        <BackgroundImgRecipes />
        {recipeSelect ? (
          <>
            <ButtonSimul
              onClick={() => setPurchasedRecipe(!purchasedRecipe)}
              text="test"
            />

            <img
              src={recipeSelect.img}
              alt={`Photo de ${recipeSelect.title}`}
              className="imgRecipe"
            />
            <h2>{recipeSelect.title}</h2>
            <div className="ingredients">
              <h3>Les ingrédients</h3>
              {recipeSelect.ingredients.map((ingredient, index) => {
                const spacing =
                  typeof ingredient.dosage === "string" &&
                  ingredient.dosage.length <= 3
                    ? ""
                    : " ";
                return (
                  <p key={index}>
                    {purchasedRecipe === false ? "***" : ingredient.quantity}
                    {spacing}
                    {purchasedRecipe === false ? " " : ingredient.dosage}{" "}
                    {ingredient.name}
                  </p>
                );
              })}
            </div>
            <div className="ustensils">
              <h3>Les ustensils</h3>
              {recipeSelect.ustensils.map((ustensils, index) => (
                <p key={index}>{ustensils}</p>
              ))}
            </div>
            <div className="steps">
              <h3>Les étapes</h3>

              {purchasedRecipe === false ? (
                <>
                  <p>
                    Étant donné le temps investi dans la création des recettes,
                    je demande une contribution de 1€ par recette. Si cela vous
                    intéresse, vous pouvez vous inscrire ou vous connecter en
                    suivant le lien ci-dessous.
                  </p>
                  <NavLink to={`/se-connecter`}>Connexion/Inscritpion</NavLink>
                </>
              ) : (
                recipeSelect.steps.map((steps, index) => (
                  <p key={index}>{steps}</p>
                ))
              )}
            </div>
          </>
        ) : (
          <NoData
            text="Désolé, nous rencontrons un problème technique."
            textClass=""
          />
        )}
      </main>
      <Footer />
    </>
  );
}
