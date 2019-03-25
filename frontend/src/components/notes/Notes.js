import React from "react";
import NotesDisplay from "./NotesDisplay.js";
import SingleNoteDisplay from "./SingleNoteDisplay.js";
import AddNoteDisplayContainer from "../../containers/AddNoteDisplayContainer.js";
import axios from "axios";
import ReactHtmlParser from "html-react-parser"; // could use to remove html tags in editor but makes whitespace
import "./Notes.css";
import TimeAgo from "react-timeago";

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNoteObj: "",
      toggleNewNote: true,
      toggleViewNoteInfo: false,
      editedNoteObj: "",
      discrepancyBtwnCurrentAndEdited: false,
      originalNoteObj: "",
      showModal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchNotes();

    let note = Object.values(this.props.notes.notes)
      .reverse()
      .find((note, i) => i === 0);

    if (note) {
      this.setCurrentNotetoFirstNote(note);
    } else {
      this.setCurrentNotetoFirstNote({
        title: "Welcome to Notetorious!",
        body: `Please create a Notebook and/or Notes to get started! Thanks!`
      });
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.handleToggleViewNoteInfo();
  }

  handleSelectDropdownChange = (e, obj) => {
    debugger;
    switch (e.value) {
      case "delete":
        this.handleDelete(this.state.currentNoteObj.id);
        break;
      case "favorites":
        this.addToFavorite();
        break;
      case "noteInfo":
        this.handleToggleViewNoteInfo();
        this.handleOpenModal();
        break;
      default:
        return;
    }
  };

  handleChange = async e => {
    await this.setState({
      currentNoteObj: { ...this.state.currentNoteObj, body: e }
    });
    this.checkDiscrepancyCurrentObjVsEditedObj();
  };

  handleChangeTitle = async e => {
    await this.setState({
      currentNoteObj: { ...this.state.currentNoteObj, title: e.target.value }
    });

    this.checkDiscrepancyCurrentObjVsEditedObj();
  };

  handleToggleNewNote = () => {
    this.props.toggleNewNote(!this.props.notes.generalUtil.toggleNewNote);
  };

  setCurrentNotetoFirstNote = firstNote => {
    this.setState({
      currentNoteObj: { ...firstNote },
      originalNoteObj: { ...firstNote }
    });
    this.handleEditedNoteObj();
  };

  getSelectionDetails = async (e, selectedNoteObj) => {
    await this.setState({
      currentNoteObj: { ...selectedNoteObj, body: selectedNoteObj.body },
      originalNoteObj: { ...selectedNoteObj, body: selectedNoteObj.body }
    });
    this.handleEditedNoteObj();
  };

  handleToggleViewNoteInfo = () => {
    this.setState({
      toggleViewNoteInfo: !this.state.toggleViewNoteInfo
    });
  };

  handleEditedNoteObj = () => {
    this.setState({
      editedNoteObj: { ...this.state.currentNoteObj }
    });
  };

  checkDiscrepancyCurrentObjVsEditedObj = () => {
    if (
      this.state.currentNoteObj.title !== this.state.editedNoteObj.title ||
      this.state.currentNoteObj.body !== this.state.editedNoteObj.body
    ) {
      this.setState({
        discrepancyBtwnCurrentAndEdited: true
      });
      this.handleEditedNoteObj(); // updates edited obj to reflect change
    } else {
      this.setState({
        discrepancyBtwnCurrentAndEdited: false,
        currentNoteObj: { ...this.state.originalNoteObj }
      });
    }
  };

  handleEditSubmit = e => {
    e.preventDefault();
    axios
      .patch(
        `/api/notes/${+this.state.editedNoteObj.notebook_id}/${+this.state
          .editedNoteObj.id}`,
        this.state.editedNoteObj
      )
      .then(() => {
        this.setState({
          editedNoteObj: { ...this.state.editedNoteObj, title: "", body: "" }
        });
      })
      .then(() => {
        this.props.fetchNotebooks();
        this.props.fetchNotes();
      });
  };

  handleEditCancel = async () => {
    this.setState({
      currentNoteObj: { ...this.state.editedNoteObj }
    });
    this.checkDiscrepancyCurrentObjVsEditedObj(); // rechecks for changes
  };

  addToFavorite = async () => {
    await this.setState({
      currentNoteObj: {
        ...this.state.currentNoteObj,
        favorited: !this.state.currentNoteObj.favorited
      }
    });

    await axios.patch(
      `/api/notes/${+this.state.currentNoteObj.notebook_id}/${+this.state
        .currentNoteObj.id}`,
      this.state.currentNoteObj
    );

    this.props.fetchNotebooks();
    this.props.fetchNotes();
  };

  handleDelete = async deleteId => {
    let note = Object.values(this.props.notes.notes)
      .reverse()
      .find(note => note.id === deleteId);

    await axios.delete(`/api/notes/${36}/${note.id}`);

    await this.props.fetchNotebooks();
    await this.props.fetchNotes();

    //this resets what note is showing to whatever is first in notes array
    let reSetMainNoteShown = Object.values(this.props.notes.notes)
      .reverse()
      .find((note, i) => i === 0);

    if (reSetMainNoteShown) {
      this.setCurrentNotetoFirstNote(reSetMainNoteShown);
    }
  };

  handleIsSearchModeOn = value => {
    if (value === "on") {
      this.setState({
        isSearchedModeOn: true
      });
    } else {
      this.setState({
        isSearchedModeOn: false
      });
    }
  };

  render() {
    console.log("STATE", this.state);
    console.log("PROPS", this.props);
    // console.log("PROPS", this.props.location.pathname);
    console.log("STATE Obj", this.state.currentNoteObj);
    console.log("EDITED: ", this.state.editedNoteObj);
    console.log("ORIGINAL : ", this.state.originalNoteObj);

    let notes;
    if (this.props.notes.notes) {
      notes = Object.values(this.props.notes.notes)
        .reverse()
        .map((note, i) => {
          let updated_at = new Date(note.updated_at);
          // let created_at = new Date(note.created_at);
          // let updated_at = <TimeAgo date={note.updated_at} />;
          // let created_at = <TimeAgo date={note.created_at} />;

          const htmlString = note.body;

          return (
            <div className="allNotesDiv" key={note.id}>
              <div
                className="allNotesContentInnerDiv"
                onClick={e => this.getSelectionDetails(e, note)}
              >
                <ul>
                  {/*<li>Id: {note.id}</li>*/}

                  <li className="noteTitleLiWrapper">
                    <div className="noteTitleLi">{note.title}</div>
                    {/*{note.favorited ? (
                      <span className="favoritedHeartSolid">
                        <i
                          className="fas fa-heart"
                          onClick={this.addToFavorite}
                        />
                      </span>
                    ) : null}*/}
                  </li>

                  <li className="noteBodyLi">{ReactHtmlParser(htmlString)}</li>
                  <li className="timeStampLi">
                    {note.updated_at ? (
                      "Updated at " + updated_at
                    ) : (
                      <TimeAgo date={note.created_at} />
                    )}
                  </li>
                  {/*<li>Parent Notebook: {note.notebook_id}</li>*/}
                  {/*<li>Favorited: {String(note.favorited)}</li>*/}
                  {/*<li />*/}
                </ul>
              </div>
              {/*<div className="deleteNoteButtonWrapper">
                <button
                  className="deleteNoteButton"
                  onClick={() => this.handleDelete(note.id)}
                >
                  Delete note
                </button>
              </div>*/}
            </div>
          );
        });
    }

    return (
      <div className="notesMainWrapper">
        <div className="notesEditorMainWrapper">
          {this.props.notes.generalUtil.toggleNewNote ? (
            <AddNoteDisplayContainer
              setCurrentNotetoFirstNote={this.setCurrentNotetoFirstNote}
            />
          ) : (
            <SingleNoteDisplay
              currentNoteObj={this.state.currentNoteObj}
              handleChange={this.handleChange}
              handleChangeTitle={this.handleChangeTitle}
              handleToggleViewNoteInfo={this.handleToggleViewNoteInfo}
              toggleViewNoteInfo={this.state.toggleViewNoteInfo}
              discrepancyBtwnCurrentAndEdited={
                this.state.discrepancyBtwnCurrentAndEdited
              }
              handleEditSubmit={this.handleEditSubmit}
              handleEditCancel={this.handleEditCancel}
              handleAddToFavorite={this.addToFavorite}
              isFavorited={this.state.currentNoteObj.favorited}
              handleDelete={this.handleDelete}
              toolbarOptions={this.props.toolbarOptions}
              handleOpenModal={this.handleOpenModal}
              handleCloseModal={this.handleCloseModal}
              showModal={this.state.showModal}
              handleSelectDropdownChange={this.handleSelectDropdownChange}
            />
          )}
        </div>
        <div className="notesAllNotesMainWrapper">
          <div className="allNotesH1TitleDiv">
            <h1>All Notes</h1>
          </div>
          <div className="divider" />
          <NotesDisplay
            notes={notes}
            handleIsSearchModeOn={this.handleIsSearchModeOn}
          />
        </div>
      </div>
    );
  }
}
