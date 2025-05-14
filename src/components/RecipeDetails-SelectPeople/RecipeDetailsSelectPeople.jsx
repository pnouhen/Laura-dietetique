import "./recipeDetailsSelectPeople.scss";

export default function RecipeDetailsSelectPeople({ number, setNumber }) {
  // Nombre de personnes configurable
  const NUMBER_OF_PEOPLE = 6;
  const peopleOptions = Array.from(
    { length: NUMBER_OF_PEOPLE },
    (_, i) => i + 1
  );

  return (
    <div className="selectPeople">
      <h3>Nombre de personnes :</h3>
      <select
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      >
        {peopleOptions.map((n) => (
          <option key={n} value={n}>
            {n} personne{n > 1 ? "s" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
