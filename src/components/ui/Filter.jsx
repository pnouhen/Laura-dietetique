import "../../styles/filter.scss"

export default function Filter({ title, groupe, onFilterChange, type }) {
  // Fonction qui gère le changement de sélection dans le filtre
  const handleChange = (e) => {
    // Récupère la valeur sélectionnée
    const value = e.target.value;
    
    // Si la valeur est "All", on réinitialise le filtre à null, sinon on applique la sélection
    onFilterChange(type, value === "All" ? null : value);
  };

  return (
    <form className="formRecipes">
      {/* Label pour le filtre, avec le titre passé en props */}
      <label htmlFor={`filter-${type}`}>{title}</label>

      {/* Si le groupe d'options est non vide, on affiche le sélecteur */}
      {groupe.length > 0 ? (
        <select id={`filter-${type}`} onChange={handleChange}>
          {/* Option "Tous" qui réinitialise le filtre à null */}
          <option value="All">Tous</option>

          {/* On génère une option pour chaque élément du groupe */}
          {groupe.map(({ id, text }) =>
            // On s'assure que chaque élément a un texte valide avant de l'afficher
            text ? (
              <option key={`${id}-${text.trim()}`} value={text}>
                {text}
              </option>
            ) : null
          )}
        </select>
      ) : (
        // Message de chargement si le groupe est vide
        <p>Loading choices...</p>
      )}
    </form>
  );
}
