import LabelInput from "../LabelInput/LabelInput";
import LabelSelect from "../LabelSelect/LabelSelect";

import "./recipeModalAddTableau.scss";

export default function RecipeModalAddTableau({
  titleCreate,
  value,
  onChange,
  data,
}) {
  return (
    <div className="modalAddTableau">
      <h3>{titleCreate}</h3>
      <form className="createTableau">
        <LabelInput
          htmlFor="name"
          label="Nom de l'ingrédient"
          value={value}
          onChange={onChange}
          type="text"
          id="name"
        />
        <LabelInput
          htmlFor="quantity"
          label="Quantités"
          value={value}
          onChange={onChange}
          type="number"
          id="quantity"
        />
        <LabelSelect
          title="Dosage"
          id="dosage"
          data={data.dosage}
          //   value={duration}
          //   onChange={(e) =>
          //     setValueGeneral((prev) => ({ ...prev, duration: e.target.value }))
          //   }
        />
      </form>
    </div>
  );
}
