import { useState } from "react";
import NoData from "../NoData/NoData";
import "./filter.scss";

export default function Filter({ label, htmlFor, data = [], propName, onChange }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const options = Array.from(
    new Map(
      data.map((item) => [
        item[propName].id,
        { id: item[propName].id, text: item[propName].text },
      ])
    ).values()
  ).sort((a, b) => a.id - b.id);

  const handleChange = (e) => {
    const val = e.target.value === "All" ? null : parseInt(e.target.value);
    setSelectedValue(val);
    onChange(val);
  };

  return (
    <form className="formRecipes">
      {options.length > 0 ? (
        <>
        <label htmlFor={htmlFor}>
          {label}
        </label>
        <select
        id={htmlFor}
        value={selectedValue === null ? "All" : selectedValue}
        onChange={handleChange}
      >
        <option value="All">Tous</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.text}
          </option>
        ))}
      </select>
        </>
        
      ) : (
        <NoData text="Données non disponibles..." />
      )}
    </form>
  );
}
