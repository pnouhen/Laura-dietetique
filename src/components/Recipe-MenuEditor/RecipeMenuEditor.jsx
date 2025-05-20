import Button from "../Button/Button";
import "./recipeMenuEditor.scss";

export default function RecipeMenuEditor({
  mode,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) {
  // Génère une classe conditionnelle en fonction du mode actif
  function getClass(action) {
    return `menuEditorButton ${
      mode === action ? "menuEditorButtonActive" : ""
    }`;
  }

  const buttonEditor = [
    {
      className: getClass("view"),
      text: "Ajouter",
      onClick: onAddClick,
    },
    {
      className: getClass("edit"),
      text: "Modifier",
      onClick: onEditClick,
    },
    {
      className: getClass("delete"),
      text: "Supprimer",
      onClick: onDeleteClick,
    },
  ];

  return (
    <section className="menuEditor">
      {buttonEditor.map(({ className, text, onClick }) => (
        <Button key={text} className={className} text={text} onClick={onClick} />
      ))}
    </section>
  );
}
