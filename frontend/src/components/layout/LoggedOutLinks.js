import React from "react";
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router';

const LoggedOutLinks = () => {
  return (
    <div>
      <ul className="right">
          <li><NavLink to='/signup'><span className="green-text lighten-2">Sign up</span></NavLink></li>
          <li><span className="black-text">or</span></li>
          <li><NavLink to='/login'><span className="green-text lighten-1">Log in</span></NavLink></li>
      </ul>
    </div>
  );
};

export default withRouter(LoggedOutLinks);
