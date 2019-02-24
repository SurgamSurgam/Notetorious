import React from "react";
import { Link } from "react-router-dom";
import { LoggedInLinks } from './LoggedInLinks.js'
import { LoggedOutLinks } from './LoggedOutLinks.js'

export const Navbar = () => {
  return (
    <nav className="nav-wrapper grey lighten-5">
      <div className="container">
        <Link to={"/"} className="brand-logo">
          <span className="black-text valign-wrapper ">Notetorious</span>
        </Link>
        <LoggedOutLinks/>
        <LoggedInLinks/>
      </div>
      {/*<Link to={"/signup"}>Movies</Link>*/}
      {/*<Link to={"/people"}>People</Link>
      <Link to={"/locations"}>Locations</Link>*/}
    </nav>
  );
};
