import ModalClose from "../ModalClose/ModalClose";

import "./modalMessage.scss";

export default function ModalMessage({
  action,
  onClickClose,
  title,
  message,
  classNameValidation,
  onClickValidate
}) {
  if (!action) return null;

  return (
    <div onClick={onClickClose} className="message">
      <div className="message_container" onClick={(e) => e.stopPropagation()}>

        <ModalClose onClick={onClickClose} />
        <h3>{title}</h3>
        <p>{message}</p>
        <div
          className={
            classNameValidation === true ? "validation" : "displayNone"
          }
        >
          <button onClick={onClickValidate}>Oui</button>
          <button onClick={onClickClose}>Non</button>
        </div>
      </div>
    </div>
  );
}
