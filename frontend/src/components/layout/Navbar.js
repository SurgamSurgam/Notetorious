import React from "react";
import { Link } from "react-router-dom";
import { LoggedInLinks } from "./LoggedInLinks.js";
import { LoggedOutLinks } from "./LoggedOutLinks.js";

export const Navbar = props => {
  return (
    <nav className="nav-wrapper grey lighten-5">
      <div className="container">
        <Link to={"/"} className="brand-logo">
          <span className="black-text valign-wrapper ">Notetorious </span>
        </Link>
        {props.isLoggedIn ? (
          <LoggedInLinks user={props.user} logoutButton={props.logoutButton} />
        ) : (
          <LoggedOutLinks />
        )}
      </div>
    </nav>
  );
};
