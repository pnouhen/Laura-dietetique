import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { fetchData } from "../../services/fetchData.jsx";

import Header from "../../components/Header/Header.jsx";
import ButtonSimul from "../../components/ButtonSimul/ButtonSimul.jsx";
import BackgroundImgRecipes from "../../components/BackgroundImgRecipes/BackgroundImgRecipes.jsx";
import CardRecipe from "../../components/CardRecipe/CardRecipe.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import "./recipesDetails.scss";

export default function RecipesDetails() {
  const { id } = useParams();
  const [recipeSelect, setRecipeSelect] = useState(null);
  const [purchasedRecipe, setPurchasedRecipe] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(1);

  const numberPeople = 6;
  const tableauNumberPeople = Array.from(
    { length: numberPeople },
    (_, i) => i + 1
  );

  useEffect(() => {
    fetchData("/data/recipes.json")
      .then((data) => setRecipeSelect(data.find((item) => item.id === id)))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipeSelect) {
    return (
      <>
        <Header />
        <main className="recipesDetails">
          <NoData
            text="Désolé, nous rencontrons un problème technique."
            textClass=""
          />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="recipesDetails">
        <ButtonSimul
          onClick={() => setPurchasedRecipe(!purchasedRecipe)}
          text={purchasedRecipe ? "Vendre" : "Achat"}
        />
        <BackgroundImgRecipes />

        <div className="recipesDetails_container">
          <h2>{recipeSelect.title}</h2>
          <div className="details">
            <CardRecipe
              duration={recipeSelect.duration}
              classNameRegime={recipeSelect.vegetarian ? "regimeActive" : ""}
              textRegime={recipeSelect.vegetarian ? "Végétarien" : ""}
              src={recipeSelect.img}
            />

            <div className="selectPeople">
              <h3>Nombre de personnes :</h3>
              <select
                value={selectedPeople}
                onChange={(e) => setSelectedPeople(Number(e.target.value))}
              >
                {tableauNumberPeople.map((n) => (
                  <option key={n} value={n}>
                    {n} personne{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="ingredients">
              <h3>Les ingrédients :</h3>
              <ul>
                {recipeSelect.ingredients.map((ingredient, index) => {
                  const quantity = purchasedRecipe
                    ? ingredient.quantity * selectedPeople
                    : "***";
                  const spacing =
                    typeof ingredient.dosage === "string" &&
                    ingredient.dosage.length < 3
                      ? ""
                      : " ";
                  return (
                    <li key={index}>
                      {quantity}
                      {spacing}
                      {purchasedRecipe ? ingredient.dosage : ""}{" "}
                      {ingredient.name}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="ustensils">
              <h3>Les ustensiles :</h3>
              <ul>
                {recipeSelect.ustensils.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="steps">
            <h3>Les étapes :</h3>
            {purchasedRecipe ? (
              <ul>
                {recipeSelect.steps.map((step, index) => (
                <li key={index}>{step}</li>
                ))}
              </ul>
            ) : (
              <div className="connexionRecipeDetails">
                <p>
                  Étant donné le temps investi dans la création des recettes, je
                  demande une contribution de 1€ par recette. <br></br> Si cela vous
                  intéresse, vous pouvez vous inscrire ou vous connecter en
                  cliquant ici :
                </p>
                <NavLink to={`/se-connecter`}>Connexion / Inscription</NavLink>
              </div>
            )}
          </div>
        </div>

        {purchasedRecipe && <button className="downloadRecipe">Télécharger au format PDF</button>}
      </main>
      <Footer />
    </>
  );
}
