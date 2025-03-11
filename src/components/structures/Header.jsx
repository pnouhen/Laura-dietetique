import { NavLink } from "react-router-dom";
import "../../styles/header.scss"

export default function Header() {
  return (
    <header>
      <div className="title">
        <img src="/assets/logo/logo.avif" alt="Logo de Laura Diététique" />
        <div className="text">
           <p>Laura diététique</p>
        <span>A l'écoute pour des conseils de qualité et personnalisés</span> 
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/qui-suis-je"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Qui suis-je ?
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/methode-et-tarif"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Méthode et Tarif
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recettes"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Recettes
            </NavLink>
          </li>
          <li>
            <a
              href="https://user.clicrdv.com/Laura-Gentes"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prendre rendez-vous
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
