import "../../styles/filter.scss"

export default function Filter({ title, groupe }) {
  return (
    <form className="formRecipes">
      <label htmlFor="categorie">{title}</label>
      {/* Voir pour faire un composant */}
      {groupe.length > 0 ? (
        <select id="categorie">
          <option value="All">Tous</option>
          {groupe.map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      ) : (
        <p>Loading choices...</p>
      )}
    </form>
  );
}
