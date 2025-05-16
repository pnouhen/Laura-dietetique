import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Services
import { fetchData } from "../../services/fetchData.jsx";
import { downloadPDF } from "../../services/downloadPDF.jsx";

// Components
import Header from "../../components/Header/Header.jsx";
import ButtonSimul from "../../components/ButtonSimul/ButtonSimul.jsx";
import RecipeBackground from "../../components/Recipe-Background/RecipeBackground.jsx";
import RecipesDetailsCard from "../../components/RecipesDetails-Card/RecipeDetailsCard.jsx";
import RecipeDetailsSelectPeople from "../../components/RecipeDetails-SelectPeople/RecipeDetailsSelectPeople.jsx";
import RecipeDetailsIngredients from "../../components/RecipeDetails-Ingredients/RecipeDetailsIngredients.jsx";
import RecipeDetailsUstensils from "../../components/RecipeDetails-Ustensils/RecipeDetailsUstensils.jsx";
import RecipeDetailsSteps from "../../components/RecipeDetails-Steps/RecipeDetailsSteps.jsx";
import Button from "../../components/Button/Button.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import Footer from "../../components/Footer/Footer.jsx";

// Styles
import "./recipeDetails.scss";

export default function RecipeDetails() {
  // State variables
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [numberPeople, setNumberPeople] = useState(1);

  // Achat / Vendre
  const [purchasedRecipe, setPurchasedRecipe] = useState(false);

  // Connecté / Non connecté
  const [connected, setConnected] = useState(false);

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
          className="connexion"
          onClick={() => setConnected(!connected)}
          text={connected ? "Déconnecter" : "Se connecter"}
        />
        <ButtonSimul
          className="purschasedRecipe"
          onClick={() => setPurchasedRecipe(!purchasedRecipe)}
          text={purchasedRecipe ? "Vendre" : "Achat"}
        />
        <RecipeBackground />

        {/* Conteneur principal de la recette */}
        <div id="recipesDetails_container" className="recipesDetails_container">
          {/* Titre de la recette */}
          <h2>{recipeDetails.title}</h2>

          {/* Détails de la recette */}
          <div className="details">
            {/* Carte de la recette */}
            <RecipesDetailsCard  data={recipeDetails}/>
            {/* Sélection du nombre de personnes */}
            <RecipeDetailsSelectPeople
              number={numberPeople}
              setNumber={setNumberPeople}
            />

            {/* Liste des ustensiles */}
            <RecipeDetailsUstensils data={recipeDetails} />

            {/* Liste des ingrédients */}
            <RecipeDetailsIngredients
              data={recipeDetails}
              connected={connected}
              purchased={purchasedRecipe}
              number={numberPeople}
            />
          </div>

          {/* Étapes de la recette */}
          <RecipeDetailsSteps
            connected={connected}
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
