import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import "./NavbarSideways.css";

const LoggedInLinks = props => {
  let addNoteInAllNotes =
    props.location.pathname === "/notebooks" ? (
      <NavLink to="/newNote">
        <span className="addNewNoteInNotesWrapper ">
          <img
            className="addButtonImg"
            src="chrome-extension://bhlhnicpbhignbdhedgjhgdocnmhomnp/images/checkmark-icon.png"
            alt=""
          />
          <div className="newNoteTitleh1">New Note</div>
        </span>
      </NavLink>
    ) : (
      <NavLink to="/notes" onClick={props.toggleNewNote}>
        <span className="addNewNoteInNotesWrapper ">
          <img className="addButtonImg" src="green-plus.png" alt="" />
          <div className="newNoteTitleh1">New Note</div>
        </span>
      </NavLink>
    );
  return (
    <div className="loggedInLinksDiv">
      <ul className="rightSideways">
        <div className="logoNameSpanSidewaysWrapper">
          <span className="logoNameSpanSideways brand-logo-Sideways">
            <i className="fas fa-book-dead" />
            <span className="usernameSideways ">{props.user}</span>
          </span>
        </div>

        {/*<li><NavLink to='/'><span className="black-text-Sideways ">Search Field</span></NavLink></li> //Extra - not MVP*/}
        <li className="addNoteLiPointingButton">{addNoteInAllNotes}</li>
        <div className="sideNavLinksContainer">
          <li className="sideNavLinks">
            <NavLink to="/favorites">
              <span className="logoNameSpanSideways brand-logo-Sideways">
                <i className="fas fa-book-dead" />
                <span className="sideNavLinksTitles ">Shortcuts</span>
              </span>
            </NavLink>
          </li>
          <li className="sideNavLinks">
            <NavLink to="/notes">
              <span className="logoNameSpanSideways brand-logo-Sideways">
                <i className="fas fa-book-dead" />
                <span className="sideNavLinksTitles ">All Notes</span>
              </span>
            </NavLink>
          </li>
          <li className="sideNavLinks">
            <NavLink to="/notebooks">
              <span className="logoNameSpanSideways brand-logo-Sideways">
                <i className="fas fa-book-dead" />
                <span className="sideNavLinksTitles ">Notebooks</span>
              </span>
            </NavLink>
          </li>
          <li className="sideNavLinks">
            <NavLink to="/tags">
              <span className="logoNameSpanSideways brand-logo-Sideways">
                <i className="fas fa-book-dead" />
                <span className="sideNavLinksTitles ">Tags</span>
              </span>
            </NavLink>
          </li>
        </div>
        <li>
          <button
            className="deleteNoteButton logout"
            onClick={props.logoutUser}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(LoggedInLinks);
