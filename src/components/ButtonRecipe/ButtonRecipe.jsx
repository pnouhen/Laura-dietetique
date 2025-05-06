import "./buttonRecipe.scss";

export default function ButtonRecipe({ text, isActive, onClick }) {
  return (
    <button
      className={`buttonRecipe${isActive ? " buttonRecipeActive" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
