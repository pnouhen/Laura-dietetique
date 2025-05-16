import "./recipeDetailsCard.scss"

export default function RecipeDetailsCard({data}){
    return(
        <div className="recipeDetailsCard">
              <p className="duration">{data.duration}</p>
              <p className={data.vegetarian ? "regimeActive" : ""}>{data.vegetarian ? "Végétarien" : ""}</p>
              <img
                src={data.img}
                alt={`Image de ${data.title}`}
                loading="eager"
              />
            </div>
    )
}