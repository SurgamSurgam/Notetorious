import React from "react";
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router';

const LoggedOutLinks = () => {
  return (
    <div className='loggedOutLinksDiv'>
      <ul className="right">
          <li className="signUpSpan"><NavLink to='/signup'>Sign up</NavLink></li>
          <li className="black-text">or</li>
          <NavLink to='/login' className="logInSpan"><li >Log in</li></NavLink>
      </ul>
    </div>
  );
};

export default withRouter(LoggedOutLinks);
