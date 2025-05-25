export default function RecipeModalAddElementsList({ value, titleList, onDelete }) {
  return (
    <div className="ingredientsList">
      <h3>{titleList}</h3>
      <ul>
        {value.map((item, index) => (
          <li key={index}>
            {typeof item === "object" ? item.name : item}
            <i
              className="fa-solid fa-trash"
              onClick={() => onDelete && onDelete(index)}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
}
