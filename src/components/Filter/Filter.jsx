import NoData from "../NoData/NoData";
import "./filter.scss";

export default function Filter({ title, groupe = [], onFilterChange, selectedFilter }) {
  const handleChange = (e) => {
    const value = e.target.value === "All" ? null : parseInt(e.target.value);
    onFilterChange(value);
  };

  return (
    <form className="formRecipes">
      <label htmlFor={`filter-${title}`}>{title}</label>
      {groupe.length > 0 ? (
        <select 
          id={`filter-${title}`} 
          value={selectedFilter === null ? "All" : selectedFilter}
          onChange={handleChange}
        >
          <option value="All">Tous</option>
          {groupe.map((option) => (
            <option key={option.id} value={option.id}>
              {option.text}
            </option>
          ))}
        </select>
      ) : (
        <NoData text="Données non disponibles..." />
      )}
    </form>
  );
}