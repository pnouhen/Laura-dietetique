import Header from "../../components/Header/Header";
import BackgroundImg from "../../components/BackgroundImg/BackgroundImg"
import LabelInput from "../../components/LabelInput/LabelInput";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

export default function Connexion() {
  return (
    <>
      <Header />
      <main className="connexion">
        <BackgroundImg />
        <div className="inscription">
        <h2>Inscription</h2>
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
      </div>
      <div className="connexion">
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
      </div>
      </main>      
      <Footer />
    </>
  );
}
