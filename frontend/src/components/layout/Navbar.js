import React from "react";
import { Link } from "react-router-dom";
import  LoggedInLinks  from "./LoggedInLinks.js";
import LoggedOutLinks from "./LoggedOutLinks.js";

export const Navbar = props => {
  console.log("NAV PROPS!", props);
  let { isLoggedIn, user } = props.user;
  return (
    <nav className="nav-wrapper grey lighten-5">
      <div className="container">
        <Link to={"/"} className="brand-logo">
          <span className="black-text valign-wrapper ">Notetorious </span>
        </Link>
        {isLoggedIn ? (
          <LoggedInLinks user={user} logoutUser={props.logoutUser} />
        ) : (
          <LoggedOutLinks />
        )}
      </div>
    </nav>
  );
};
