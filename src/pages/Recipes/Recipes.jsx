import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData.jsx";

import Header from "../../components/Header/Header.jsx";
import BackgroundImg from "../../components/BackgroundImg/BackgroundImg.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import CardRecipe from "../../components/CardRecipe/CardRecipe.jsx";
import NoData from "../../components/NoData/NoData.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./recipes.scss";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const [selectedRegime, setSelectedRegime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const [index, setIndex] = useState(0);
  const visibleRecipes = 9;

  useEffect(() => {
    fetchData("/public/data/recipes.json")
      .then((data) => {
        const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
        setRecipes(sorted);
        setFilteredRecipes(sorted);
      })
      .catch((error) => console.error("Error during fetch:", error));
  }, []);

  useEffect(() => {
    let result = recipes;

    if (selectedRegime !== null) {
      result = result.filter((r) => r.regime_alimentaire.id === selectedRegime);
    }
    if (selectedCategory !== null) {
      result = result.filter((r) => r.categorie.id === selectedCategory);
    }
    if (selectedDuration !== null) {
      result = result.filter((r) => r.duree.id === selectedDuration);
    }

    setFilteredRecipes(result);
    setIndex(0);
  }, [recipes, selectedRegime, selectedCategory, selectedDuration]);

  const pageCount = Math.ceil(filteredRecipes.length / visibleRecipes);
  const currentPage = Math.floor(index / visibleRecipes) + 1;

  return (
    <>
      <Header />
      <main className="recipes">
        <BackgroundImg url="/assets/img/background/background-recipes.webp" />
        <section className="choice">
          <h2 className="titleRecipesCards">Choisissez votre :</h2>
          <Filter
            label="Régime alimentaire :"
            htmlFor="DietaryRegime"
            data={recipes}
            propName="regime_alimentaire"
            onChange={(val) => setSelectedRegime(val)}
          />
          <Filter
            label="Catégorie :"
            htmlFor="Category"
            data={recipes}
            propName="categorie"
            onChange={(val) => setSelectedCategory(val)}
          />
          <Filter
            label="Durée :"
            htmlFor="Duration"
            data={recipes}
            propName="duree"
            onChange={(val) => setSelectedDuration(val)}
          />
        </section>

        <section className="recipesCards">
          <h2 className="titleRecipesCards">Recettes :</h2>
          {filteredRecipes.length > 0 ? (
            <>
              {filteredRecipes
                .slice(index, index + visibleRecipes)
                .map((card) => (
                  <CardRecipe
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    src={card.img}
                  />
                ))}
              <Pagination
                index={index}
                setIndex={setIndex}
                visible={visibleRecipes}
                data={filteredRecipes}
                textPrev="Préc."
                textNext="Suiv."
                counter={`${currentPage} / ${pageCount}`}
                hideButtonsWhenExtreme={true}
              />
            </>
          ) : (
            <NoData
              text="Pas de recettes disponibles"
              textClass="titleRecipesCards"
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
