import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchData } from "../../services/fetchData.jsx";

import Header from "../../components/Header/Header.jsx";
import ButtonSimul from "../../components/ButtonSimul/ButtonSimul.jsx";
import BackgroundImgRecipes from "../../components/BackgroundImgRecipes/BackgroundImgRecipes.jsx";
import CardRecipe from "../../components/CardRecipe/CardRecipe.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import Footer from "../../components/Footer/Footer.jsx";

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
  return (
    <>
      <Header />
      <main className="recipesDetails">
        <ButtonSimul
          onClick={() => setPurchasedRecipe(!purchasedRecipe)}
          text={purchasedRecipe === false ? "Achat" : "Vendre"}
        />
        <BackgroundImgRecipes />
        {recipeSelect ? (
          <>
            <div className="recipesDetails_container">
              <h2>{recipeSelect.title}</h2>
              <div className="details">
                <CardRecipe
                  duration={recipeSelect.duration}
                  classNameRegime={
                    recipeSelect.vegetarian === true ? "regimeActive" : ""
                  }
                  textRegime={
                    recipeSelect.vegetarian === true ? "Végétarien" : ""
                  }
                  src={recipeSelect.img}
                />
                <div className="selectPeople">
                  <h3> Nombre de personnes :</h3>
                  <select name="selectPeople" id="selectPeople">
                  {[...Array(6)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} personne{i + 1 > 1 ? "s" : ""}
                    </option>
                  ))}
                  </select>
                </div>
                <div className="ingredients">
                  <h3>Les ingrédients :</h3>
                  {/* Relier à l'option */}
                  <ul>
                    {recipeSelect.ingredients.map((ingredient, index) => {
                      const spacing =
                        typeof ingredient.dosage === "string" &&
                        ingredient.dosage.length < 3
                          ? ""
                          : " ";
                      return (
                        <li key={index}>
                          {purchasedRecipe === false
                            ? "***"
                            : ingredient.quantity}
                          {spacing}
                          {purchasedRecipe === false
                            ? " "
                            : ingredient.dosage}{" "}
                          {ingredient.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="ustensils">
                  <h3>Les ustensils :</h3>
                  <ul>
                    {recipeSelect.ustensils.map((ustensils, index) => (
                      <li key={index}>{ustensils}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="steps">
                <h3>Les étapes :</h3>
                <ul>
                  {purchasedRecipe === false ? (
                    <>
                      <li>
                        Étant donné le temps investi dans la création des
                        recettes, je demande une contribution de 1€ par recette.
                        Si cela vous intéresse, vous pouvez vous inscrire ou
                        vous connecter en suivant le lien ci-dessous.
                      </li>
                      <NavLink to={`/se-connecter`}>
                        Connexion/Inscritpion
                      </NavLink>
                    </>
                  ) : (
                    recipeSelect.steps.map((steps, index) => (
                      <li key={index}>{steps}</li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            {purchasedRecipe === false ? (
              ""
            ) : (
              <button>Télécharger au format pdf</button>
            )}
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
