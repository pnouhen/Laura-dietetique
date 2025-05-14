import Header from "../../components/Header/Header";
import BackgroundImg from "../../components/BackgroundImg/BackgroundImg"
import LabelInput from "../../components/LabelInput/LabelInput";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

import "./connexion.scss"

export default function Connexion() {
  return (
    <>
      <Header />
      <main className="connexion">
        <BackgroundImg url="/assets/img/background/background-connexion.webp" />
        <div className="formConnexion">
        <h2>Connexion</h2>
        <form action="">
          <LabelInput
          className="e-mail"
          htmlFor="e-mail"
          label="E-mail :"
          type="mail"
          id="e-mail"
        />
        <LabelInput
          className="password"
          htmlFor="password"
          label="Mot de passe :"
          type="password"
          id="password"
        />
        <Button text="Se connecter"/>
        </form>        
      </div>
        <div className="formInscription">
        <h2>Inscription</h2>
        <form action="submit">
          <LabelInput
          className="name"
          htmlFor="name"
          label="Nom :"
          type="text"
          id="name"
        />
        <LabelInput
          className="firstName"
          htmlFor="firstName"
          label="Prénom :"
          type="text"
          id="firstName"
        />
        <LabelInput
          className="e-mail"
          htmlFor="e-mail"
          label="E-mail :"
          type="mail"
          id="e-mail"
        />
        <LabelInput
          className="password"
          htmlFor="password"
          label="Mot de passe :"
          type="password"
          id="password"
        />
        <LabelInput
          className="checkPassword"
          htmlFor="checkPassword"
          label="Confirmer votre mot de passe :"
          type="password"
          id="checkPassword"
        />
        <Button text="S'inscrire" />
        </form>               
      </div>      
      </main>      
      <Footer />
    </>
  );
}
