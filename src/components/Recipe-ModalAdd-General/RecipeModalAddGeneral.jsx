import LabelInput from "../LabelInput/LabelInput";
import LabelSelect from "../LabelSelect/LabelSelect";
import RecipeModalAddGeneralImportImg from "../Recipe-ModalAdd-General-ImportImg/RecipeModalAddGeneralImportImg";

import "./recipeModalAddGeneral.scss";

export default function RecipeModalAddGeneral({
  title,
  setData,
  data,
  categorie,
  duration,
  vegetarian,
  img,
  onclickCloseImg,
}) {
  // Définition des champs <select>
  const selects = [
    {
      title: "Catégorie",
      id: "categorie",
      value: categorie,
      options: data.categories,
    },
    {
      title: "Durée",
      id: "duration",
      value: duration,
      options: data.durations,
    },
    {
      title: "Végétarien",
      id: "vegetarian",
      value: vegetarian,
      options: data.vegetarian,
    },
  ];

  return (
    <form className="modalAddGeneral">
      {/* Champ texte : titre de la recette */}
      <LabelInput
        className="labelInputModalAdd"
        htmlFor="title"
        label="Titre de la recette"
        type="text"
        id="title"
        value={title}
        onChange={(e) =>
          setData((prev) => ({ ...prev, title: e.target.value }))
        }
      />

      {/* Champs select dynamiques */}
      {selects.map(({ title, id, value, options }) => (
        <LabelSelect
          key={id}
          title={title}
          id={id}
          data={options}
          value={value}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [id]: e.target.value }))
          }
        />
      ))}

      {/* Composant d’import d’image */}
      <RecipeModalAddGeneralImportImg
        data={data}
        setData={setData}
        value={img}
        onclickCloseImg={onclickCloseImg}
      />
    </form>
  );
}
