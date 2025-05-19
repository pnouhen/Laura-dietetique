import RecipeModalAddIngredientsAdd from "../Recipe-ModalAdd-Ingredients-Add/RecipeModalAddIngredientsAdd"
import RecipeModalAddIngredientsList from "../Recipe-ModalAdd-Ingredients-List/RecipeModalAddIngredientsList";

export default function RecipeModalAddIngredients({className, value, onChange, data, onDelete }) {
  return (
    <div className={className}>
      <RecipeModalAddIngredientsAdd
        value={value}
        onChange={onChange}
        data={data}
      />
      <RecipeModalAddIngredientsList value={value} onDelete={onDelete}/>
    </div>
  );
}