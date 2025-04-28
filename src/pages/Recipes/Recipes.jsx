import { useState, useEffect } from "react";

import Header from "../../components/Header/Header.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./recipes.scss";

export default function Recipes() {
  // État pour les données des recettes
  const [data, setData] = useState(null);

  // Si data == null, on gère l'affichage
  const [dataNull, setDataNull] = useState(true);

  // Utiliser useEffect pour détecter le changement de data
  useEffect(() => {
    if (data === null) {
      setDataNull(false); // Si data est null, on change l'état
    } else {
      setDataNull(true); // Sinon, on remet dataNull à true
    }
  }, [data]); // Ce useEffect se déclenche chaque fois que 'data' change

  // État pour savoir si les filtres sont appliqués ou non
  const [clean, setClean] = useState(true);

  // État pour garder les filtres appliqués
  const [filters, setFilters] = useState({
    regime: null,   // Filtre par régime alimentaire
    categorie: null, // Filtre par catégorie
    duree: null,    // Filtre par durée
  });

  // Fonction pour générer un groupe unique et trié par clé (ex: régime, catégorie, durée)
const getGroup = (key) => {
  if (!data) return []; // Vérifie si data est null avant d'essayer d'utiliser map

  return Array.from(
    new Map(
      data
        .map((r) => r[key])  // On récupère la clé donnée (régime, catégorie, durée)
        .filter((v) => v?.text)  // Filtrage des éléments sans texte
        .map((v) => [v.text.trim(), v])  // On utilise le texte comme clé pour éliminer les doublons
    ).values()
  ).sort((a, b) => a.id - b.id); // Trie les résultats par id
};

  // Fonction pour trier et filtrer les recettes en fonction des filtres appliqués
  const getFilteredRecipes = () => {
    const sorted = [...data].sort((a, b) =>
      a.title.localeCompare(b.title, "fr") // Trie les recettes par titre
    );
    
    // Si les filtres sont réinitialisés (clean === true), on retourne toutes les recettes triées
    if (clean) return sorted;

    // Si des filtres sont appliqués, on filtre les recettes selon les critères choisis
    return sorted.filter(
      (r) =>
        (!filters.regime || r.regime_alimentaire?.text === filters.regime) &&
        (!filters.categorie || r.categorie?.text === filters.categorie) &&
        (!filters.duree || r.duree?.text === filters.duree)
    );
  };

  // Appel de la fonction pour obtenir les recettes filtrées
  const recipes = data ? getFilteredRecipes() : [];

  return (
    <>
      <Header />
      <GenerateData setData={setData} url="./data/recipes.json" /> {/* Chargement des données */}
      <section className={dataNull ? "recipes" : "recipes dataNull"} >
      {data ? (
          <>
          <article className="choise">
            <h2>Choisissez votre :</h2>
            <div className="formRecipes_container">
              {/* Application des filtres pour chaque catégorie (régime, catégorie, durée) */}
              <Filter
                title="Régime :"
                groupe={getGroup("regime_alimentaire")}
                type="regime"
                onFilterChange={(type, value) => {
                  setClean(false); // On applique les filtres
                  setFilters((prev) => ({ ...prev, [type]: value })); // Mise à jour des filtres
                }}
              />
              <Filter
                title="Catégorie :"
                groupe={getGroup("categorie")}
                type="categorie"
                onFilterChange={(type, value) => {
                  setClean(false);
                  setFilters((prev) => ({ ...prev, [type]: value }));
                }}
              />
              <Filter
                title="Durée :"
                groupe={getGroup("duree")}
                type="duree"
                onFilterChange={(type, value) => {
                  setClean(false);
                  setFilters((prev) => ({ ...prev, [type]: value }));
                }}
              />
            </div>
          </article>

          <article className="recipesCards" id="recipesCards">
            <h2>Recettes :</h2>
            {/* Si des recettes sont trouvées, on les affiche, sinon on affiche un message */}
            {recipes.length > 0 ? (
              recipes.map((r) => (
                <div className="card" key={r.title}>
                  <h3>{r.title}</h3>
                  <img src={r.img} alt={`Photo de ${r.title}`} loading="lazy"/>
                </div>
              ))
            ) : (
              <p className="noRecipesMessage">Aucune recette trouvée.</p> // Message d'absence de résultats
            )}
          </article>
          </>
      ) : (
        <p className="loadingMessage">Chargement des données...</p> // Message de chargement
      )}
      </section>
      <Footer />
    </>
  );
}
