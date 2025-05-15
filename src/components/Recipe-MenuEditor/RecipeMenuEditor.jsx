import RecipeMenuEditorButtonAdd from "../Recipe-MenuEditor-Buttons/RecipeMenuEditorButtonAdd";
import RecipeMenuEditorButtonChange from "../Recipe-MenuEditor-Buttons/RecipeMenuEditorButtonChange";
import RecipeMenuEditorButtonDelete from "../Recipe-MenuEditor-Buttons/RecipeMenuEditorButtonDelete";

import "./recipeMenuEditor.scss";

export default function RecipeMenuEditor({
  mode,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) {
  function getClass(action) {
    return `menuEditorButton ${
      mode === action ? "menuEditorButtonActive" : ""
    }`;
  }

  return (
    <>
      <section className="menuEditor">
        <h2>Que souhaites-tu faire :</h2>
        <RecipeMenuEditorButtonAdd
          onClick={onAddClick}
          className={getClass("view")}
        />
        <RecipeMenuEditorButtonChange
          onClick={onEditClick}
          className={getClass("edit")}
        />
        <RecipeMenuEditorButtonDelete
          onClick={onDeleteClick}
          className={getClass("delete")}
        />
      </section>
    </>
  );
}
