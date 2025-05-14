export default function RecipeDetailsIngredients({ data, connected, purchased, number }) {
  return (
    <div className="ingredients">
      <h3>Les ingrédients :</h3>
      <ul>
        {data.ingredients.map((ingredient, index) => {
          const quantity = connected && purchased ? ingredient.quantity * number : "***";

          const spacing =
            typeof ingredient.dosage === "string" &&
            ingredient.dosage.length < 3
              ? ""
              : " ";

          return (
            <li key={index}>
              {quantity}
              {spacing}
              {connected && purchased ? ingredient.dosage : ""} {ingredient.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
