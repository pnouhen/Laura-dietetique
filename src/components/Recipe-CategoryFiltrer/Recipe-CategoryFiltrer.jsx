import Button from "../Button/Button.jsx";
import NoData from "../NoData/NoData.jsx";

import "./recipeCategoryFiltrer.scss";

export default function RecipeCategoryFilter({ buttons, activeButton, handleButtonClick, recipes }) {
  return (
    <section className="choice">
      <h2 className="titleRecipesCards">Choisissez votre :</h2>
      {recipes.length > 0 ? (
        <div className="choice_container">
          <Button
            text="Tous"
            className={`buttonRecipe ${activeButton === null ? "buttonRecipeActive" : ""}`}
            onClick={() => handleButtonClick(null)}
          />

          {buttons.map(({ id, text }) => (
            <Button
              key={id}
              id={id}
              text={text}
              className={`buttonRecipe ${activeButton === id ? "buttonRecipeActive" : ""}`}
              onClick={() => handleButtonClick(id)}
            />
          ))}
        </div>
      ) : (
        <NoData
          text="Désolé, nous rencontrons un problème technique."
          textClass=""
        />
      )}
    </section>
  );
}