import { useState, useEffect } from "react";
import { fetchData } from "../../service/FetchData.jsx";

import Header from "../../components/Header/Header.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./recipes.scss";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // États pour les filtres sélectionnés
  const [selectedRegime, setSelectedRegime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  useEffect(() => {
    fetchData("/public/data/recipes.json")
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data); // Initialiser avec toutes les recettes
      })
      .catch((error) => console.error("Error lors du fetch:", error));
  }, []);

  // Fonction utilitaire pour extraire les valeurs uniques et les trier par id
  const getUniqueValues = (items, propName) =>
    Array.from(
      new Map(
        items.map((item) => [
          item[propName].id,
          { id: item[propName].id, text: item[propName].text },
        ])
      ).values()
    ).sort((a, b) => a.id - b.id);

  // Utilisation de la fonction pour chaque propriété
  const uniqueRegimes =
    recipes.length > 0 ? getUniqueValues(recipes, "regime_alimentaire") : [];
  const uniqueCategory =
    recipes.length > 0 ? getUniqueValues(recipes, "categorie") : [];
  const uniqueDuration =
    recipes.length > 0 ? getUniqueValues(recipes, "duree") : [];

  // Fonction pour gérer les changements de filtres
  const handleFilterChange = (filterType, selectedId) => {
    switch (filterType) {
      case "regime":
        setSelectedRegime(selectedId === selectedRegime ? null : selectedId);
        break;
      case "category":
        setSelectedCategory(
          selectedId === selectedCategory ? null : selectedId
        );
        break;
      case "duration":
        setSelectedDuration(
          selectedId === selectedDuration ? null : selectedId
        );
        break;
      default:
        break;
    }
  };

  // Appliquer les filtres lorsqu'ils changent
  useEffect(() => {
    let result = recipes;

    if (selectedRegime !== null) {
      result = result.filter(
        (recipe) => recipe.regime_alimentaire.id === selectedRegime
      );
    }

    if (selectedCategory !== null) {
      result = result.filter(
        (recipe) => recipe.categorie.id === selectedCategory
      );
    }

    if (selectedDuration !== null) {
      result = result.filter((recipe) => recipe.duree.id === selectedDuration);
    }

    setFilteredRecipes(result);
  }, [recipes, selectedRegime, selectedCategory, selectedDuration]);

  return (
    <>
      <Header />
      <main className="recipes">
        <img className="backgroundRecipes" src="/assets/img/background/background-recipes.webp" alt="Arrière plan de la page web" />
        <section className="choice">
          <h2 className="titleRecipesCards">Choisissez votre :</h2>
          <Filter
            title="Régime :"
            groupe={uniqueRegimes}
            onFilterChange={(selectedId) =>
              handleFilterChange("regime", selectedId)
            }
            selectedFilter={selectedRegime}
          />
          <Filter
            title="Catégorie :"
            groupe={uniqueCategory}
            onFilterChange={(selectedId) =>
              handleFilterChange("category", selectedId)
            }
            selectedFilter={selectedCategory}
          />
          <Filter
            title="Durée :"
            groupe={uniqueDuration}
            onFilterChange={(selectedId) =>
              handleFilterChange("duration", selectedId)
            }
            selectedFilter={selectedDuration}
          />
        </section>
        <section className="recipesCards">
          <h2 className="titleRecipesCards">Recettes :</h2>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((card) => (
              <div className="card" key={card.title}>
                <h3>{card.title}</h3>
                <img
                  src={card.img}
                  alt={`Photo de ${card.title}`}
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            <NoData
              text="Aucune recette ne correspond aux filtres sélectionnés"
              textClass="titleRecipesCards"
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
