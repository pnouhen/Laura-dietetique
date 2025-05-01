import { useState, useEffect } from "react";
import { fetchData } from "../../service/FetchData.jsx";

import Header from "../../components/Header/Header.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./recipes.scss";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);          // State to store all recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]);  // State for filtered recipes

  // States for selected filters
  const [selectedRegime, setSelectedRegime] = useState(null);    // Selected dietary regime
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [selectedDuration, setSelectedDuration] = useState(null); // Selected duration

  // Fetch recipe data when the component mounts
  useEffect(() => {
    fetchData("/public/data/recipes.json")
      .then((data) => {
        setRecipes(data);                     // Set all recipes
        setFilteredRecipes(data);             // Initialize filtered recipes with all recipes
      })
      .catch((error) => console.error("Error during fetch:", error));
  }, []);

  // Utility function to get unique values from a property and sort by id
  const getUniqueValues = (items, propName) =>
    Array.from(
      new Map(
        items.map((item) => [
          item[propName].id,
          { id: item[propName].id, text: item[propName].text },
        ])
      ).values()
    ).sort((a, b) => a.id - b.id);

  // Get unique regimes, categories, and durations
  const uniqueRegimes =
    recipes.length > 0 ? getUniqueValues(recipes, "regime_alimentaire") : [];
  const uniqueCategory =
    recipes.length > 0 ? getUniqueValues(recipes, "categorie") : [];
  const uniqueDuration =
    recipes.length > 0 ? getUniqueValues(recipes, "duree") : [];

  // Function to handle filter changes
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

  // Apply filters when any of the selected filters change
  useEffect(() => {
    let result = recipes;

    // Apply dietary regime filter
    if (selectedRegime !== null) {
      result = result.filter(
        (recipe) => recipe.regime_alimentaire.id === selectedRegime
      );
    }

    // Apply category filter
    if (selectedCategory !== null) {
      result = result.filter(
        (recipe) => recipe.categorie.id === selectedCategory
      );
    }

    // Apply duration filter
    if (selectedDuration !== null) {
      result = result.filter((recipe) => recipe.duree.id === selectedDuration);
    }

    // Update filtered recipes state
    setFilteredRecipes(result);
  }, [recipes, selectedRegime, selectedCategory, selectedDuration]);

  return (
    <>
      <Header />
      <main className="recipes">
        <img className="backgroundRecipes" src="/assets/img/background/background-recipes.webp" alt="Page background" />
        <section className="choice">
          <h2 className="titleRecipesCards">Choose your:</h2>
          {/* Filter components */}
          <Filter
            title="Dietary Regime:"
            groupe={uniqueRegimes}
            onFilterChange={(selectedId) =>
              handleFilterChange("regime", selectedId)
            }
            selectedFilter={selectedRegime}
          />
          <Filter
            title="Category:"
            groupe={uniqueCategory}
            onFilterChange={(selectedId) =>
              handleFilterChange("category", selectedId)
            }
            selectedFilter={selectedCategory}
          />
          <Filter
            title="Duration:"
            groupe={uniqueDuration}
            onFilterChange={(selectedId) =>
              handleFilterChange("duration", selectedId)
            }
            selectedFilter={selectedDuration}
          />
        </section>
        <section className="recipesCards">
          <h2 className="titleRecipesCards">Recipes:</h2>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((card) => (
              <div className="card" key={card.title}>
                <h3>{card.title}</h3>
                <img
                  src={card.img}
                  alt={`Image of ${card.title}`}
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            // Display a message if no recipes match the filters
            <NoData
              text="No recipes match the selected filters"
              textClass="titleRecipesCards"
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
