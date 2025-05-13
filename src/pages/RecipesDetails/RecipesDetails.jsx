import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Services
import { fetchData } from "../../services/fetchData.jsx";
import { downloadPDF } from "../../services/downloadPDF.jsx";

// Components
import Header from "../../components/Header/Header.jsx";
import ButtonSimul from "../../components/ButtonSimul/ButtonSimul.jsx";
import BackgroundImgRecipes from "../../components/BackgroundImgRecipes/BackgroundImgRecipes.jsx";
import RecipeDetailsSelectPeople from "../../components/RecipeDetailsSelectPeople/RecipeDetailsSelectPeople.jsx";
import RecipeDetailsIngredients from "../../components/RecipeDetailsIngredients/RecipeDetailsIngredients.jsx";
import RecipeDetailsUstensils from "../../components/RecipeDetailsUstensils/RecipeDetailsUstensils.jsx";
import RecipeDetailsSteps from "../../components/RecipeDetailsSteps/RecipeDetailsSteps.jsx";
import CardRecipe from "../../components/CardRecipe/CardRecipe.jsx";
import Button from "../../components/Button/Button.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import Footer from "../../components/Footer/Footer.jsx";

// Styles
import "./recipesDetails.scss";

export default function RecipesDetails() {
  // State variables
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [numberPeople, setNumberPeople] = useState(1);

  // Achat / Vendre
  const [purchasedRecipe, setPurchasedRecipe] = useState(false);

  // Fetch recipe data
  useEffect(() => {
    fetchData("/data/recipes.json")
      .then((data) => {
        const recipe = data.find((item) => item.id === id);
        setRecipeDetails(recipe);
      })
      .catch((err) =>
        console.error("Erreur de chargement de la recette :", err)
      );
  }, [id]);

  const handleDownload = () => {
    const container = document.getElementById("recipesDetails_container");
    downloadPDF(container, recipeDetails);
  };

  // Affichage de chargement
  if (!recipeDetails) {
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
  // Rendu principal de la page
  return (
    <>
      <Header />
      <main className="recipesDetails">
        {/* Bouton d'achat/vente */}
        <ButtonSimul
          onClick={() => setPurchasedRecipe(!purchasedRecipe)}
          text={purchasedRecipe ? "Vendre" : "Achat"}
        />

        <BackgroundImgRecipes />

        {/* Conteneur principal de la recette */}
        <div id="recipesDetails_container" className="recipesDetails_container">
          {/* Titre de la recette */}
          <h2>{recipeDetails.title}</h2>

          {/* Détails de la recette */}
          <div className="details">
            {/* Carte de la recette */}
            <CardRecipe
              duration={recipeDetails.duration}
              classNameRegime={recipeDetails.vegetarian ? "regimeActive" : ""}
              textRegime={recipeDetails.vegetarian ? "Végétarien" : ""}
              src={recipeDetails.img}
            />

            {/* Sélection du nombre de personnes */}
            <RecipeDetailsSelectPeople
              number={numberPeople}
              setNumber={setNumberPeople}
            />

            {/* Liste des ingrédients */}
            <RecipeDetailsIngredients
              data={recipeDetails}
              purchased={purchasedRecipe}
              number={numberPeople}
            />

            {/* Liste des ustensiles */}
            <RecipeDetailsUstensils data={recipeDetails} />
          </div>

          {/* Étapes de la recette */}
          <RecipeDetailsSteps
            purchased={purchasedRecipe}
            data={recipeDetails}
          />
        </div>

        {/* Bouton de téléchargement PDF */}
        {purchasedRecipe && (
          <Button
            text="Télécharger au format PDF"
            className={"downloadRecipe"}
            onClick={handleDownload}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
