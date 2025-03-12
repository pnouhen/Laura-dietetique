import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/header.scss";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <img src="/assets/logo/logo.avif" alt="Logo de Laura Diététique" />
      <div className="header___container">
        <div className="text">
          <h1>Laura diététique</h1>
          <p>A l'écoute pour des conseils de qualité et personnalisés</p>
        </div>
        <i
          className="fa-solid fa-bars"
          onClick={() => {
            setOpen(!open);
          }}
        ></i>
        <nav className={ open ? "mobile" : ""}>
          <i class={open ? "fa-solid fa-xmark" : ""} onClick={() => {
            setOpen(!open);
          }}></i>
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
              Méthode et Tarifs
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
      </div>
    </header>
  );
}
