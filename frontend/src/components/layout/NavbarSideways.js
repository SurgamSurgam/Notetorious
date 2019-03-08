import React from "react";
import { Link } from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks.js";
import LoggedOutLinks from "./LoggedOutLinks.js";
import "./NavbarSideways.css";

export const NavbarSideways = props => {
  console.log("NAV PROPS!", props);

  let { isLoggedIn, user } = props.user;

  // to control nav display
  const classNames = ["navWrapperSideways"];
  if (
    props.location.pathname !== "/newNote" ||
    props.location.pathname !== "/favorites" ||
    props.location.pathname !== "/notes" ||
    props.location.pathname !== "/notebooks" ||
    props.location.pathname !== "/tags"
  ) {
    classNames.push("hide");
  }

  return (
    <nav className={classNames.join(" ")}>
      <div className="containerSideways">
        {isLoggedIn ? (
          <LoggedInLinks
            user={user}
            logoutUser={props.logoutUser}
            toggleNewNote={props.toggleNewNote}
          />
        ) : null}
      </div>
    </nav>
  );
};
