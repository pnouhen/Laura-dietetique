export default function RecipeModalAddIngredientsList({ value, onDelete }) {
  return (
    <div className="ingredientsList">
      <h3>Liste des ingrédients</h3>
      <ul>
        {value.map((item, index) => {
          // Gère un espace conditionnel entre la quantité et le dosage
          const spacing = typeof item.dosage === "string" && item.dosage.length < 3 ? "" : " ";
          return (
            <li key={index}>
              {item.quantity}
              {spacing}
              {item.dosage} {item.name}
              <i
                className="fa-solid fa-trash"
                onClick={() => onDelete(index)}
              ></i>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
