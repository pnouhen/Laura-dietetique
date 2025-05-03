import "./buttonMore.scss";

export default function ButtonMore({ text, onClick }) {
  return <button className="buttonMore" onClick={onClick}>{text}</button>;
}
