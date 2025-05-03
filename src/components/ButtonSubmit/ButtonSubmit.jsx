import "./buttonSubmit.scss"

export default function ButtonSubmit({ onClick }) {
  return <button className="buttonSubmit" type="submit" onClick={onClick}>Partagez</button>;
}
