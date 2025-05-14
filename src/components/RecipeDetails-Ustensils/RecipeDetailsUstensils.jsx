export default function RecipeDetailsUstensils({data}){
    return(
        <div className="ustensils">
              <h3>Les ustensiles :</h3>
              <ul>
                {data.ustensils.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
    )
}