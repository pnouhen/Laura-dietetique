import "./homeReviewCardButtonMore.scss";

export default function HomeReviewCardButtonMore({ text, onClick }) {
  return <button className="buttonMore" onClick={onClick}>{text}</button>;
}
