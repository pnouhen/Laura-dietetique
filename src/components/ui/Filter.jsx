import "../../styles/filter.scss"

export default function Filter({ title, groupe }) {
  return (
    <form className="formRecipes">
      <label htmlFor="categorie">{title}</label>
      {/* Voir pour faire un composant */}
      {groupe.length > 0 ? (
        <select id="categorie">
          <option value="All">Tous</option>
          {groupe.map((choice) => {
  if (!choice?.text) return null; // Skip invalid entries

  return (
    <option key={`${choice.id}-${choice.text.trim()}`} value={choice.text}>
      {choice.text}
    </option>
  );
})}
        </select>
      ) : (
        <p>Loading choices...</p>
      )}
    </form>
  );
}
