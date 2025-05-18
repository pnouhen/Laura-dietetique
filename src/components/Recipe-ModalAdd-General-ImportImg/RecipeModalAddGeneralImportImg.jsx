import { useRef } from "react";
import { downloadImg } from "../../services/downloadImg";

import ModalClose from "../ModalClose/ModalClose";

import "./recipeModalAddGeneralImportImg.scss";

export default function RecipeModalAddGeneralImportImg({ value, onclickCloseImg, setData }) {
  const inputRef = useRef(null);
  return (
    <div className="importImg">
      {value !== "" ? (
        <>
        <img src={value} alt="Aperçu" />
        <ModalClose onClick={onclickCloseImg} />
        </>        
      ) : (
        <>
          <i className="fa-solid fa-image"></i>
          <button type="button" onClick={() => inputRef.current.click()}>
            + Ajouter une image
          </button>
          <input
            type="file"
            accept=".webp"
            ref={inputRef}
            onChange={(e) => downloadImg(e, setData)}
          /> 
          {/* Mettre les bouttons pour fermer la modal et supprimer l'image */}
          <p>format autorisé : webp</p>
        </>
      )}
    </div>
  );
}
