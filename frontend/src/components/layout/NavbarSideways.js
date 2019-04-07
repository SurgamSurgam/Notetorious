import React from "react";
import LoggedInLinks from "./LoggedInLinks.js";
import "./NavbarSideways.css";
import AddNoteDisplayContainer from "../../containers/AddNoteDisplayContainer.js";
import FavoritesContainer from "../../containers/FavoritesContainer.js";
import NotesContainer from "../../containers/NotesContainer.js";
import NotebooksContainer from "../../containers/NotebooksContainer.js";
import TagsContainer from "../../containers/TagsContainer.js";
import { PrivateRoute } from "../../utils/AuthRouting";
import { Switch } from "react-router-dom";

export const NavbarSideways = props => {

  let { isLoggedIn, user } = props.user;

  // to control nav display
  const classNames = ["appDashboardContainer"];
  if (props.location.pathname !== "/newNote") {
    classNames.pop();
    classNames.push("appDashboardContainerForEverythingElse");
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
  } else {
    return (
      <div className={classNames}>
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
