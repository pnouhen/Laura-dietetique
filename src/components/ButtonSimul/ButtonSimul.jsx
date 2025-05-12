import "./buttonSimul.scss"

export default function ButtonSimul({onClick, text}){
    return(
        <button className="buttonSimul" onClick={onClick}>
              {text}
            </button>
    )
}