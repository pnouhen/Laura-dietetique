import ModalClose from "../ModalClose/ModalClose";

import "./modalMessage.scss"

export default function ModalMessage({ action, onClick, title, message }) {
  if (!action) return null;

  return (
    <div onClick={onClick} className="message">
      <div className="message_container">
        <ModalClose onClick={onClick} />
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}