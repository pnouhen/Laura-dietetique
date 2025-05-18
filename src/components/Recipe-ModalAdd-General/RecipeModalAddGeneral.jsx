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
  return (
    <form className="modalAddGeneral" action="">
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
      <LabelSelect
        title="Catégorie"
        id="categorie"
        data={data.categories}
        value={categorie}
        onChange={(e) =>
          setData((prev) => ({ ...prev, categorie: e.target.value }))
        }
      />
      <LabelSelect
        title="Durée"
        id="duration"
        data={data.durations}
        value={duration}
        onChange={(e) =>
          setData((prev) => ({ ...prev, duration: e.target.value }))
        }
      />
      <LabelSelect
        title="Végétarien"
        id="vegetarian"
        data={data.vegetarian}
        value={vegetarian}
        onChange={(e) =>
          setData((prev) => ({ ...prev, vegetarian: e.target.value }))
        }
      />
      <RecipeModalAddGeneralImportImg
        data={data}
        setData={setData}
        value={img}
        onclickCloseImg={onclickCloseImg}
      />
    </form>
  );
}
