import { useEffect, useRef, useState } from "react";
import { fetchData } from "../../services/fetchData";
import { isFormEmpty, resetFormFields } from "../../services/formUtils";

import LabelInput from "../LabelInput/LabelInput";
import Button from "../Button/Button";

export default function AuthPageConnexionForm({
  onValidationError,
  onLoginSuccess,
}) {
  const [admin, setAdmin] = useState([]); // Stocke les comptes admin
  const [users, setUsers] = useState([]); // Stocke les comptes utilisateurs

  // Chargement des données admin et users au montage
  useEffect(() => {
    // Chargement des admins
    fetchData("/data/admin.json")
      .then((data) => setAdmin(data))
      .catch((error) => console.error("Erreur de chargement admin :", error));

    // Chargement des users
    fetchData("/data/users.json")
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erreur de chargement user :", error));
  }, []);

  const emailConnexionRef = useRef();
  const passwordConnexionRef = useRef();

  // Fonction de vérification des identifiants
  const checkCredentials = (email, password, userList) => {
    if (!Array.isArray(userList)) return null;

    return userList.find(
      (user) => user.email === email && user.password === password
    );
  };

  // Soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();

    const refs = [emailConnexionRef, passwordConnexionRef];
    if (isFormEmpty(refs)) {
      onValidationError("L'adresse mail ou le mot de passe est incorrect");
      return;
    }

    const email = emailConnexionRef.current.value;
    const password = passwordConnexionRef.current.value;

    // Vérification dans les deux listes
    const foundAdmin = checkCredentials(email, password, admin);
    const foundUser = checkCredentials(email, password, users);

    if (foundAdmin || foundUser) {
      const userType = foundAdmin ? "admin" : "user";
      const userData = foundAdmin || foundUser;
      function resetForm() {
        resetFormFields([emailConnexionRef, passwordConnexionRef]);
      }

      console.log(`Connexion réussie en tant que ${userType}`);
      resetForm();

      // Transmet les données utilisateur et son type au composant parent
      if (onLoginSuccess) {
        onLoginSuccess(userData, userType);
      }
      // TODO : ajouter la logique post-connexion (stockage, redirection...)
    } else {
      onValidationError("L'adresse mail ou le mot de passe est incorrect");
    }
  };

  return (
    <div className="authPage-ConnexionForm">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <LabelInput
          className="e-mailConnexion"
          htmlFor="e-mailConnexion"
          label="E-mail :"
          type="email"
          id="e-mailConnexion"
          ref={emailConnexionRef}
        />
        <LabelInput
          className="passwordConnexion"
          htmlFor="passwordConnexion"
          label="Mot de passe :"
          type="password"
          id="passwordConnexion"
          ref={passwordConnexionRef}
        />
        <Button text="Se connecter" />
      </form>
    </div>
  );
}
