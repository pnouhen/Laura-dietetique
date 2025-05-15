import RecipeModalAddNavItem from "../Recipe-ModalAdd-NavItem/RecipeModalAddNavItem"

import "./recipeModalAdd.scss"

export default function RecipeModalAdd(){
    
    return(
        <section className="modalAdd">
            <div className="modalAdd_container">
                <h2>Ajouter une recette</h2>
                <nav>
                 <RecipeModalAddNavItem
                 text="text"
                 />   
                </nav>
                
            </div>
        </section>
    )
}