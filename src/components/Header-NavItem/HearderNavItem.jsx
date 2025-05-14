import { NavLink } from "react-router-dom";

import "./headerNavItem.scss"

export default function HeaderNavItem({to, text}){
    return(
        <li className="navitem">
              <NavLink
                to={`/${to}`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {text}
              </NavLink>
            </li>
    )
}