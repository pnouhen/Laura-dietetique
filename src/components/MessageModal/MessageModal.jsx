import "./messageModal.scss"

export default function MessageModal({ action, clickPoster, poster, title, clickClose, message }) {
  if (!action) return null;

  return (
    <div onClick={clickPoster} className={poster}>
      <div className="message_container">
        <h3>{title}</h3>
        <i onClick={clickClose} className="fa-solid fa-xmark"></i>
        <p>{message}</p>
      </div>
    </div>
  );
}