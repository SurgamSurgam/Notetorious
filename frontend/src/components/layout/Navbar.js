import React from "react";
import { Link } from "react-router-dom";
import  LoggedInLinks  from "./LoggedInLinks.js";
import LoggedOutLinks from "./LoggedOutLinks.js";
import './layout.css';

export const Navbar = props => {
  console.log("NAV PROPS!", props);

  let { isLoggedIn, user } = props.user;
  return (
    <nav className="nav-wrapper grey lighten-5">
      <div className="container">
        <Link to={"/"} className="brand-logo">
          <span className="logoNameSpan" >
            <i className="fas fa-book-dead">
              <span className='logoTitleSpan'>Notetorious</span>
            </i>
          </span>

        </Link>
        {isLoggedIn ? (
          <LoggedInLinks user={user} logoutUser={props.logoutUser} toggleNewNote={props.toggleNewNote} />
        ) : (
          <LoggedOutLinks />
        )}
      </div>
    </nav>
  );
};
