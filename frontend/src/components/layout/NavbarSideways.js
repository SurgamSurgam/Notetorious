import React from "react";
import { Link } from "react-router-dom";
import LoggedInLinks from "./LoggedInLinks.js";
import LoggedOutLinks from "./LoggedOutLinks.js";
import "./NavbarSideways.css";
import AddNoteDisplayContainer from "../../containers/AddNoteDisplayContainer.js";
import FavoritesContainer from "../../containers/FavoritesContainer.js";
import NotesContainer from "../../containers/NotesContainer.js";
import NotebooksContainer from "../../containers/NotebooksContainer.js";
import TagsContainer from "../../containers/TagsContainer.js";
import { PrivateRoute } from "../../utils/AuthRouting";
import { Switch } from "react-router-dom";

export const NavbarSideways = props => {
  console.log("NAV PROPS!", props);

  let { isLoggedIn, user } = props.user;

  // to control nav display
  const classNames = ["navWrapperSideways", "appSideNavDiv"];
  if (
    props.location.pathname !== "/newNote" ||
    props.location.pathname !== "/favorites" ||
    props.location.pathname !== "/notes" ||
    props.location.pathname !== "/notebooks" ||
    props.location.pathname !== "/tags"
  ) {
    classNames.push("hide");
  }

  if (!isLoggedIn) {
    return (
      <div className="loaderDiv">
        <span className="logoNameSpanInLogin">
          <i className="fas fa-book-dead" />
          <span className="logoTitleSpan">Notetorious</span>
        </span>
        <img src={require("./Ripple-1s-200px.svg")} alt="" />
      </div>
    );
    debugger;
  } else {
    return (
      <div className="appDashboardContainer">
        <nav className="navWrapperSideways">
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
        <Switch>
          <PrivateRoute path="/newNote" component={AddNoteDisplayContainer} />
          <PrivateRoute path="/favorites" component={FavoritesContainer} />
          <PrivateRoute path="/notes" component={NotesContainer} />
          <PrivateRoute path="/notebooks" component={NotebooksContainer} />
          <PrivateRoute path="/tags" component={TagsContainer} />
        </Switch>
      </div>
    );
  }
};
