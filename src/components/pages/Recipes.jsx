import { useState } from "react";

import Header from "../structures/Header.jsx";
import GenerateData from "../services/GenerateData.jsx";
import Filter from "../ui/Filter.jsx";
import Footer from "../structures/Footer.jsx";

import "../../styles/recipes.scss";

export default function Recipes() {
  const [data, setData] = useState(null);

  let ordreData = [];
  let groupeDiet = [];
  let groupeCategories = [];
  let groupeDuration = [];

  if (data) {
    // Tri alphabétique des titres
    ordreData = [...data].sort((a, b) => {
      return a.title.localeCompare(b.title, "fr", { sensitivity: "base" });
    });

    // Groupe régime alimentaire
    groupeDiet = Array.from(
      new Map(
        data
          .map((r) => r.regime_alimentaire)
          .filter((r) => r && r.text)
          .map((r) => [r.text.trim(), r])
      ).values()
    ).sort((a, b) => a.id - b.id);

    // Groupe catégories triées
    groupeCategories = Array.from(
      new Map(
        data
          .map((r) => r.categorie)
          .filter((r) => r && r.text)
          .map((r) => [r.text.trim(), r])
      ).values()
    ).sort((a, b) => a.id - b.id);

    // Groupe durées triées
    groupeDuration = Array.from(
      new Map(
        data
          .map((r) => r.duree)
          .filter((r) => r && r.text)
          .map((r) => [r.text.trim(), r])
      ).values()
    ).sort((a, b) => a.id - b.id);
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
          <article className="recipesCards">
            <h2>Recettes :</h2>
              {ordreData.map((recipe) => (
              <div className="card" key={recipe.title}>
                <h3>{recipe.title}</h3>
                <img src={recipe.img} alt={`Photo de ${recipe.title}`} />
              </div>
            ))}          
          </article>
        </section>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </>
  );
}
