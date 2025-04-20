import { useState } from "react";

import Header from "../structures/Header.jsx";
import GenerateData from "../services/GenerateData.jsx";
import Filter from "../ui/Filter.jsx";

import "../../styles/recipes.scss";

export default function Recipes() {
  const [data, setData] = useState(null);

  let groupeDiet = [];
  let groupeCategories = [];
  let groupeDuration = [];
  if (data) {
    groupeDiet = [
      ...new Set(
        data
          .filter((r) => r.regime_alimentaire)
          .map((r) => r.regime_alimentaire)
      ),
    ];
    groupeCategories = [
      ...new Set(
        data
          .sort((a, b) => a.categorie.id - b.categorie.id)
          .map((r) => r.categorie.text)
      ),
    ];
    groupeDuration = [
      ...new Set(
        data.sort((a, b) => a.duree.id - b.duree.id).map((r) => r.duree.text)
      ),
    ];
  }
  return (
    <>
      <Header />
      <GenerateData setData={setData} url="./data/recipes.json" />
      {data ? (
        <section className="recipes">
          <article className="choise">
            <h2>Choisissez votre :</h2>
            <div className="formRecipes_container">
              <Filter title="Le régime alimentaire :" groupe={groupeDiet} />
              <Filter title="La catégorie :" groupe={groupeCategories} />
              <Filter title="La durée :" groupe={groupeDuration} />
            </div>
          </article>
          <article>
            <h2>Recettes :</h2>
            {data.map((recipe) => (
  <h3 key={recipe.title}>{recipe.title}</h3>
))}
{/* Trier data par ordre alphabe */}
          </article>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
