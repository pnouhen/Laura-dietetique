// Generer les composants : function pdf, nbr personnes, ingrédients, ustensils, étapes


import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Services
import { fetchData } from "../../services/fetchData.jsx";

// Components
import Header from "../../components/Header/Header.jsx";
import ButtonSimul from "../../components/ButtonSimul/ButtonSimul.jsx";
import BackgroundImgRecipes from "../../components/BackgroundImgRecipes/BackgroundImgRecipes.jsx";
import CardRecipe from "../../components/CardRecipe/CardRecipe.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import Footer from "../../components/Footer/Footer.jsx";

// Styles
import "./recipesDetails.scss";

export default function RecipesDetails() {
  // State variables
  const { id } = useParams();
  const [recipeSelect, setRecipeSelect] = useState(null);
  const [purchasedRecipe, setPurchasedRecipe] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(1);

  // Nombre de personnes configurable
  const NUMBER_OF_PEOPLE = 6;
  const peopleOptions = Array.from(
    { length: NUMBER_OF_PEOPLE },
    (_, i) => i + 1
  );

  // Fetch recipe data
  useEffect(() => {
    fetchData("/data/recipes.json")
      .then((data) => {
        const recipe = data.find((item) => item.id === id);
        setRecipeSelect(recipe);
      })
      .catch((err) => console.error("Erreur de chargement de la recette :", err));
  }, [id]);

  // Générer un PDF de la recette
  const downloadPDF = async () => {
    if (!recipeSelect) return;

    const container = document.getElementById('recipesDetails_container');
    
    try {
      // Convertir le contenu en image
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Ajouter l'image au PDF
      pdf.addImage(
        imgData, 
        'PNG', 
        10, 
        10, 
        imgWidth, 
        imgHeight
      );

      // Télécharger le PDF
      pdf.save(`${recipeSelect.title}_recette.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF :', error);
      alert('Impossible de générer le PDF. Réessayez.');
    }
  };

  // Affichage de chargement
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
        <div 
          id="recipesDetails_container" 
          className="recipesDetails_container"
        >
          {/* Titre de la recette */}
          <h2>{recipeSelect.title}</h2>

          {/* Détails de la recette */}
          <div className="details">
            {/* Carte de la recette */}
            <CardRecipe
              duration={recipeSelect.duration}
              classNameRegime={recipeSelect.vegetarian ? "regimeActive" : ""}
              textRegime={recipeSelect.vegetarian ? "Végétarien" : ""}
              src={recipeSelect.img}
            />

            {/* Sélection du nombre de personnes */}
            <div className="selectPeople">
              <h3>Nombre de personnes :</h3>
              <select
                value={selectedPeople}
                onChange={(e) => setSelectedPeople(Number(e.target.value))}
              >
                {peopleOptions.map((n) => (
                  <option key={n} value={n}>
                    {n} personne{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Liste des ingrédients */}
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

            {/* Liste des ustensiles */}
            <div className="ustensils">
              <h3>Les ustensiles :</h3>
              <ul>
                {recipeSelect.ustensils.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Étapes de la recette */}
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
                  demande une contribution de 1€ par recette. <br />
                  Si cela vous intéresse, vous pouvez vous inscrire ou vous 
                  connecter en cliquant ici :
                </p>
                <NavLink to={`/se-connecter`}>
                  Connexion / Inscription
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Bouton de téléchargement PDF */}
        {purchasedRecipe && (
          <button 
            className="downloadRecipe" 
            onClick={downloadPDF}
          >
            Télécharger au format PDF
          </button>
        )}
      </main>
      <Footer />
    </>
  );
}