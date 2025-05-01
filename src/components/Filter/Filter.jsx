import NoData from "../NoData/NoData";
import "./filter.scss";

export default function Filter({ title, groupe = [], onFilterChange, selectedFilter }) {
  // Function to handle changes in the filter selection
  const handleChange = (e) => {
    // If the "All" option is selected, set the value to null
    // Otherwise, convert the selected value to an integer
    const value = e.target.value === "All" ? null : parseInt(e.target.value);
    onFilterChange(value); // Call the callback passed as a prop with the selected value
  };

  return (
    <form className="formRecipes">
      {/* Display the title of the filter */}
      <label htmlFor={`filter-${title}`}>{title}</label>
      
      {/* Check if the 'groupe' array has items to render a select dropdown */}
      {groupe.length > 0 ? (
        <select 
          id={`filter-${title}`} 
          value={selectedFilter === null ? "All" : selectedFilter} // Set the selected value, defaulting to "All" if no filter is applied
          onChange={handleChange} // Call handleChange when the user selects a new option
        >
          <option value="All">Tous</option> {/* Option to reset filter to 'All' */}
          {groupe.map((option) => (
            // Map through the 'groupe' array to create an option for each item
            <option key={option.id} value={option.id}>
              {option.text} {/* Display the text of the option */}
            </option>
          ))}
        </select>
      ) : (
        // If no items are available, display a "No Data" message
        <NoData text="Données non disponibles..." />
      )}
    </form>
  );
}
