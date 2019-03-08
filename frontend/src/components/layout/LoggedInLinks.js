import React from "react";
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import "./NavbarSideways.css";

const LoggedInLinks = (props) => {
  let addNoteInAllNotes = (props.location.pathname === '/notebooks') ? (<NavLink to='/newNote' ><span className="black-text-Sideways ">New Note</span></NavLink>) : (
    <NavLink to='/notes' onClick={props.toggleNewNote}><span className="black-text-Sideways ">New Note</span></NavLink>
  )
  return (
    <div className='loggedInLinksDiv'>
      <ul className="rightSideways">
          <li><span className="black-text-Sideways ">{props.user}</span></li>
          {/*<li><NavLink to='/'><span className="black-text-Sideways ">Search Field</span></NavLink></li> //Extra - not MVP*/}
          <li>
            {addNoteInAllNotes}
          </li>
          <li><NavLink to='/favorites'><span className="black-text-Sideways ">Favorites</span></NavLink></li>
          <li><NavLink to='/notes'><span className="black-text-Sideways ">All Notes</span></NavLink></li>
          <li><NavLink to='/notebooks'><span className="black-text-Sideways ">Notebooks</span></NavLink></li>
          <li><NavLink to='/tags'><span className="black-text-Sideways ">Tags</span></NavLink></li>
          <li><button onClick={props.logoutUser}>Logout</button></li>
      </ul>
    </div>
  );
};

export default withRouter(LoggedInLinks)
