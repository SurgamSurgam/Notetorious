import React from "react";
import { NavLink } from 'react-router-dom'

export const LoggedInLinks = () => {
  return (
    <div>
      <ul className="right">
          <li><NavLink to='/'><span className="black-text ">New Note</span></NavLink></li>
          <li><NavLink to='/'><span className="black-text ">All Notes</span></NavLink></li>
          <li><NavLink to='/'><span className="black-text ">Notebooks </span></NavLink></li>
          <li><NavLink to='/'><span className="black-text ">Log Out </span></NavLink></li>
      </ul>
    </div>
  );
};
