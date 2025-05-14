import "./buttonSimul.scss"

export default function ButtonSimul({className, onClick, text}){
    return(
         <button className={`buttonSimul ${className}`} onClick={onClick}>
      {text}
    </button>
    )
}