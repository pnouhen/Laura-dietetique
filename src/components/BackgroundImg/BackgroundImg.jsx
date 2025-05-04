import "./backgroundImg.scss"

export default function BackgroundImg({url}){
    return(
        <img
          src={url}
          alt="Arrière plan de la page"
          className="backgroundImg"
          loading="lazy"
        />
    )
}