import React from "react";
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

const LoggedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
          <li><span className="black-text ">{props.user}</span></li>
          <li><NavLink to='/'><span className="black-text ">Search Field</span></NavLink></li>
          <li><NavLink to='/'><span className="black-text ">New Note</span></NavLink></li>
          <li><NavLink to='/'><span className="black-text ">Favorites</span></NavLink></li>
          <li><NavLink to='/'><span className="black-text ">All Notes</span></NavLink></li>
          <li><NavLink to='/notebooks'><span className="black-text ">Notebooks</span></NavLink></li>
          <li><NavLink to='/tags'><span className="black-text ">Tags</span></NavLink></li>
          <li><button onClick={props.logoutUser}>Logout</button></li>
      </ul>
    </div>
  );
};

export default withRouter(LoggedInLinks)
