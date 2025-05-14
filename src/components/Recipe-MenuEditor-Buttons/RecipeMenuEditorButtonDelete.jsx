import Button from "../Button/Button";

export default function RecipeMenuEditorButtonDelete({ className, onClick }) {
  return <Button className={className} text="Supprimer" onClick={onClick} />;
}
