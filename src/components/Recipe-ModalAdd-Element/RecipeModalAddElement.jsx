import RecipeModalAddElementAdd from "../Recipe-ModalAdd-Element-Add/RecipeModalAddElementAdd"
import RecipeModalAddElementsList from "../Recipe-ModalAdd-Elements-List/RecipeModalAddElementsList"

export default function RecipeModalAddElement({className, value, onChange, data, onDelete, titleAdd, titleLabel, titleList }){
    return(
        <div className={className}>
        <RecipeModalAddElementAdd 
        titleAdd={titleAdd}
        titleLabel={titleLabel}
        value={value}
        onChange={onChange}
        data={data}
        />
        <RecipeModalAddElementsList value={value} titleList={titleList} onDelete={onDelete}/>
        </div>
    )
}