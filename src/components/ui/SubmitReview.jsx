import { useState } from "react";

import "../../styles/submitReview.scss";
// Reste : vider les input lors du click, 
// mettre en place le message de confirmation + animation
// animation des étoiles avec un composant
export default function SubmitReview() {
  const [click, setClick] = useState(false);
  return (
    <>
      <section className="submitReview">
        <h2>Laisser un avis :</h2>
        <form action="submit">
          <div className="name">
            <label htmlFor="name">Nom</label>
            <input type="text" />
          </div>
          <div className="firstName">
            <label htmlFor="firstname">Prénom</label>
            <input type="text" />
          </div>
          <div className="ratings">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <p>Très bien</p>
          </div>
          <div className="formReview">
            <label htmlFor="review">Avis</label>
            <input type="text" />
          </div>
        </form>
        <button onClick={() => setClick(!click)}>Partagez</button>
      </section>
      <div className={click ? "messageConf" : "hidden"}>
        <div className="messageConf_container">
          <h3>Avis déposé</h3>
        <i class="fa-solid fa-xmark"></i>
        <p>Merci d'avoir du temps pour donner votre avis</p>
        </div>
        
      </div>
    </>
  );
}
