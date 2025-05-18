import "./recipeModalAddList.scss";

export default function RecipeModalAddList({ value, title, onDelete }) {
  return (
    <div className="list">
      <h3>{title}</h3>
      <ul className="ingredientsList">
        {value.map((item, index) => {
          const spacing =
            typeof item.dosage === "string" && item.dosage.length < 3 ? "" : " ";
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
