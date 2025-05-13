import "./button.scss";

export default function Button({ text, className, onClick }) {
  return (
    <button
      className={`buttonComposent ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
