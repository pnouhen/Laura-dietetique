import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../services/fetchData";

import Header from "../Header/Header";
import BackgroundImgRecipes from "../../components/BackgroundImgRecipes/BackgroundImgRecipes.jsx";
import NoData from "../NoData/NoData.jsx";
import Footer from "../Footer/Footer";

import "./recipesDetails.scss";

export default function RecipesDetails() {
    const [recipeSelect, setRecipeSelect] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      fetchData("/data/recipes.json")
        .then((data) => {
          const recipe = data.find((item) => item.id === id);
          setRecipeSelect(recipe);
        })
        .catch((err) => console.error(err));
    }, [id]);
  
    return (
      <>
        <Header />
        <main>
          <BackgroundImgRecipes />
          {recipeSelect ? (
            <>
              <h2>{recipeSelect.title}</h2>
              {/* Autres infos de la recette ici */}
            </>
          ) : (
            <NoData
              text="Désolé, nous rencontrons un problème technique."
              textClass=""
            />
          )}
        </main>
        <Footer />
      </>
    );
  }
  