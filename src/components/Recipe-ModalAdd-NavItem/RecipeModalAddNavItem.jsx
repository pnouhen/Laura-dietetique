import "./recipeModalAddNavItem.scss";

export default function RecipeModalAddNavItem({ text, action, onClick }) {
  return (
    <button className={`modalNavItem ${action}`} onClick={onClick}>
      {text}
    </button>
  );
}
