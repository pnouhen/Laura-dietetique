export default function RecipeModalAddElementsList({value, titleList, onDelete }) {
  return (
    <div className="ingredientsList">
      <h3>{titleList}</h3>
      <ul>
          {value.map((item, index) => {
            return(
              <li key={index}>
                {/* Afficher la propriété name de l'objet item */}
                {item.name}
                <i
                  className="fa-solid fa-trash"
                  onClick={() => onDelete && onDelete(index)}
                ></i>
              </li>
            )              
          })}
      </ul>
    </div>
  );
}