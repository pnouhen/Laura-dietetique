import { useState, useEffect } from "react";
import { fetchData } from "../../services/fetchData.jsx";

import Header from "../../components/Header/Header.jsx";
import Filter from "../../components/Filter/Filter.jsx";
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

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  useEffect(() => {
    fetchData("/public/data/recipes.json")
      .then((data) => {
        setRecipes(data.sort((a, b) => a.title.localeCompare(b.title)));
        setFilteredRecipes(data);
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
  }, [recipes, selectedRegime, selectedCategory, selectedDuration]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <>
      <Header />
      <main className="recipes">
        <section className="choice">
          <h2 className="titleRecipesCards">Choose your:</h2>

          <Filter
            label="Regime alimentaire :"
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
          {currentRecipes.length > 0 ? (
            <>
              {currentRecipes.map((card) => (
                <CardRecipe
                  key={card.title}
                  title={card.title}
                  src={card.img}
                />
              ))}
                
                <div className="pagination">
                  {currentPage > 1 && (
                  <div className="pagination-prev" onClick={() => paginate(currentPage - 1)}>
                    <i className="fa-solid fa-chevron-left"></i>
                    <p>Préc.</p>
                  </div>
                )}
                <p className="counter">{`${currentPage} / ${totalPages}`}</p>
                {currentPage < totalPages && (
                  <div className="pagination-next" onClick={() => paginate(currentPage + 1)}>
                    <p>Suiv.</p>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                )}
                </div>
                
            </>
          ) : (
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
