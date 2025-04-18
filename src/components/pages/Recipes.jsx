import { useState } from "react";

import Header from "../structures/Header.jsx";
import GenerateData from "../services/GenerateData.jsx";

import "../../styles/recipes.scss";

export default function Recipes() {
  const [data, setData] = useState(null);
  let groupeDuration = [];
  if (data) {
    groupeDuration = [...new Set(data.map((recipe) => recipe.durée))];
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
              <form className="formRecipes">
                <label htmlFor="categorie">Votre régime alimentaire :</label>
                <select id="categorie">
                  <option value="All">Tous</option>
                </select>
              </form>
              <form className="formRecipes">
                <label htmlFor="categorie">La catégorie :</label>
                <select id="categorie">
                  <option value="All">Tous</option>
                </select>
              </form>
              <form className="formRecipes">
                <label htmlFor="categorie">La durée :</label>

                {groupeDuration.length > 0 ? (
                  <select id="categorie">
                    <option value="All">Tous</option>
                    {groupeDuration.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Loading durations...</p>
                )}
              </form>
            </div>
          </article>
          <article>
            <h2>Recettes :</h2>
          </article>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
