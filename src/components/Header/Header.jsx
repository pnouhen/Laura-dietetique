import { useState } from "react";

import HeaderNavItem from "../Header-NavItem/HearderNavItem";
import HeaderIconMobile from "../Header-IconMobile/HeaderIconMobile";

import "./header.scss";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <img src="/assets/logo/logo.webp" alt="Logo de Laura Diététique" />
      <div className="header___container">
        <div className="text">
          <h1>Laura diététique</h1>
          <p>A l'écoute pour des conseils de qualité et personnalisés</p>
        </div>
        <HeaderIconMobile
            open={open}
            setOpen={setOpen}
            iconClosed="fa-bars"
          />
        <nav className={open ? "mobile active" : ""}>
          {/* Icone qui ouvre/ferme le menu en mobile */}
          
          <HeaderIconMobile open={open} setOpen={setOpen} iconOpen="fa-xmark" />
          <ul>
            <HeaderNavItem to="" text="Accueil" />
            <HeaderNavItem to="qui-suis-je" text=" Qui suis-je ?" />
            <HeaderNavItem to="consultations-et-tarifs" text="Consultations et Tarifs" />
            <li>
              <a
                className="appointment"
                href="https://user.clicrdv.com/Laura-Gentes"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prendre rendez-vous
              </a>
            </li>
            <HeaderNavItem to="recettes" text="Recettes" />
            <HeaderNavItem to="se-connecter" text="Se connecter" />
          </ul>
        </nav>
      </div>
    </header>
  );
}
