import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import "./NavbarSideways.css";
import Select from "react-select";
import Fuse from "fuse.js";
import { fetchNotes } from "../../actions/NotesActions.js";
import { fetchNotebooks } from "../../actions/NotebooksActions.js";
import { connect } from "react-redux";
import { searchedResults } from "../../actions/NotebooksActions.js";

const mapStateToProps = state => {
  return {
    notes: state.notes,
    notebooks: state.notebooks,
    savedSearchResults: state.notebooks.savedSearchResults
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    searchedResults: results => dispatch(searchedResults(results))
  };
};

class LoggedInLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      allNotesAndNotebooks: ""
    };
  }

  async componentDidMount() {
    await this.props.fetchNotes();
    await this.props.fetchNotebooks();
    this.concatAndRemoveDupes(
      Object.values(this.props.notes.notes),
      Object.values(this.props.notebooks)
    );
  }

  removeDupes = arr => {
    let set1 = new Set(arr);
    return [...set1];
  };

  concatAndRemoveDupes = (arr1, arr2) => {
    let allNotesAndNotebooks = this.removeDupes([...arr1, ...arr2]);
    this.setState({
      allNotesAndNotebooks: allNotesAndNotebooks
    });
  };

  handleSearchChange = e => {
    this.setState({
      searchQuery: e.target.value
    });
  };

  async handleSearchSubmit() {
    //Search Query
    let fuseOptions = {
      caseSensitive: true,
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["title", "body"]
    };
    if (this.state.allNotesAndNotebooks && this.state.searchQuery) {
      let fuse = new Fuse(this.state.allNotesAndNotebooks, fuseOptions); // "list" is the item array
      let result = fuse.search(this.state.searchQuery);
      await this.props.searchedResults(result);
    }
  }

  render() {
    console.log("SEARCHING:", this.state);
    const options = [
      {
        value: "logout",
        label: `Sign out`
      }
    ];

    let addNoteInAllNotes =
      this.props.location.pathname === "/notebooks" ? (
        <NavLink to="/newNote">
          <span className="addNewNoteInNotesWrapper ">
            <img className="addButtonImg" src="green-plus.png" alt="" />
            <div className="newNoteTitleh1">New Note</div>
          </span>
        </NavLink>
      ) : (
        <NavLink to="/notes" onClick={this.props.toggleNewNote}>
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
              <span className="logoBackground">
                <i className="fas fa-book-dead" />
              </span>
              <span className="usernameSideways ">
                {this.props.user
                  .split("")[0]
                  .toUpperCase()
                  .concat(this.props.user.slice(1))}
              </span>
              <Select
                onChange={this.props.logoutUser}
                options={options}
                placeholder={""}
                defaultMenuIsOpen={false}
                openMenuOnFocus={false}
                cacheOptions={false}
              />
            </span>
          </div>
          {/*-----------SEARCH FIELD HERE------------*/}
          <li className="searchInputLi">
            <form
              className="searchInputForm"
              onSubmit={this.handleSearchSubmit}
            >
              <input
                type="text"
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
                placeholder="Search all notes..."
              />
              <i className="fas fa-search" onClick={this.handleSearchSubmit} />
            </form>
          </li>
          <li className="addNoteLiPointingButton">{addNoteInAllNotes}</li>
          <div className="sideNavLinksContainer">
            <li className="sideNavLinks">
              <NavLink to="/favorites">
                <span className="logoNameSpanSideways brand-logo-Sideways">
                  <img
                    className="greyStar sideNavLogo"
                    src="greyStar1.png"
                    alt=""
                  />
                  <span className="sideNavLinksTitles ">Shortcuts</span>
                </span>
              </NavLink>
            </li>
            <li className="sideNavLinks">
              <NavLink to="/notes">
                <span className="logoNameSpanSideways brand-logo-Sideways">
                  <img
                    className="greyNote sideNavLogo"
                    src="greyNote.png"
                    alt=""
                  />
                  <span className="sideNavLinksTitles ">All Notes</span>
                </span>
              </NavLink>
            </li>
            <li className="sideNavLinks">
              <NavLink to="/notebooks">
                <span className="logoNameSpanSideways brand-logo-Sideways">
                  <img
                    className="greyNotebook sideNavLogo"
                    src="greyNotebook.png"
                    alt=""
                  />
                  <span className="sideNavLinksTitles ">Notebooks</span>
                </span>
              </NavLink>
            </li>
            <li className="sideNavLinks">
              <NavLink to="/tags">
                <span className="logoNameSpanSideways brand-logo-Sideways">
                  <img
                    className="greyTag sideNavLogo"
                    src="greyTag.png"
                    alt=""
                  />
                  <span className="sideNavLinksTitles ">Tags</span>
                </span>
              </NavLink>
            </li>
          </div>
          {/*<li className="logoutButtonLi">
          <button className="logoutButton logout" onClick={this.props.logoutUser}>
            Logout
          </button>
        </li>*/}
        </ul>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoggedInLinks)
);
