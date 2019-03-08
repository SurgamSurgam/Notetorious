import React from "react";
import { Link } from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks.js";
import LoggedOutLinks from "./LoggedOutLinks.js";
import "./NavbarHorizontal.css";

export const NavbarHorizontal = props => {
  console.log("NAV PROPS!", props);

  let { isLoggedIn, user } = props.user;

  //to control nav display
  // const classNames = ["navWrapper"];
  // if (props.location.pathname !== "/") {
  //   classNames.push("hide");
  // }

  const classNames = ["navWrapper"];
  if (props.location.pathname !== '/') {
    classNames.push("hideLoggedOutLinks");
  }

  return (
    <nav className={classNames.join(" ")}>
      <div className="container">
        <Link to={"/"} className="brand-logo">
          <span className="logoNameSpan">
            <i className="fas fa-book-dead">
              <span className="logoTitleSpan">Notetorious</span>
            </i>
          </span>
        </Link>
        {!isLoggedIn ? <LoggedOutLinks /> : null}
      </div>
    </nav>
  );
};
