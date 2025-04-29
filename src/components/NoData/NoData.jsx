import "./noData.scss";

export default function NoData({ text, textClass }) {
  return <p className={`noData ${textClass}`}>{text}</p>;
}
