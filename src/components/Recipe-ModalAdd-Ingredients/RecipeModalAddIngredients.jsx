import RecipeModalAddIngredientsAdd from "../Recipe-ModalAdd-Ingredients-Add/RecipeModalAddIngredientsAdd";
import RecipeModalAddList from "../Recipe-ModalAdd-List/RecipeModalAddList";

import "./recipeModalAddIngredients.scss";

export default function RecipeModalAddIngredients({ value, onChange, data, onDelete }) {
  return (
    <div className="addIngredients">
      <RecipeModalAddIngredientsAdd
        value={value}
        onChange={onChange}
        data={data}
      />
      <RecipeModalAddList value={value} title="Liste des ingrédients" onDelete={onDelete}/>
    </div>
  );
}
