import "./modalClose.scss";

export default function ModalClose({ onClick }) {
  return <i onClick={onClick} className="fa-solid fa-xmark"></i>;
}
