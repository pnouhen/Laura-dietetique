import { NavLink } from "react-router-dom";
import "../../styles/header.scss";

export default function Nav() {
  return (
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
  );
}
