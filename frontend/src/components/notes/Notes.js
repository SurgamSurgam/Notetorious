import React from "react";
import { NotesDisplay } from "./NotesDisplay.js";
import { SingleNoteDisplay } from "./SingleNoteDisplay.js";
import AddNoteDisplayContainer from "../../containers/AddNoteDisplayContainer.js";

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNoteObj: "",
      toggleNewNote: true,
      toggleViewNoteInfo: false
      // newNote: { title: "", body: "", notebook_id: "" }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchNotes();
    // await this.props.fetchNotebooks();

    let notes = Object.values(this.props.notes.notes).find(
      (note, i) => i === 0
    );

    // let defaultNotebook = Object.values(this.props.notebooks).find(
    //   notebook => notebook.is_default === true
    // );
    // //
    if (notes) {
      this.setCurrentNotetoFirstNote(notes);
    }
  }

  handleChange = e => {
    this.setState({
      currentNoteObj: { ...this.state.currentNoteObj, body: e }
    });
  };

  handleChangeTitle = e => {
    this.setState({
      currentNoteObj: { ...this.state.currentNoteObj, title: e.target.value }
    });
  };

  // handleNewNoteChange = e => {
  //   if (typeof e === "string") {
  //     this.setState({
  //       newNote: { ...this.state.newNote, body: e }
  //     });
  //   } else {
  //     this.setState({
  //       newNote: { ...this.state.newNote, title: e.target.value }
  //     });
  //   }
  // };

  handleToggleNewNote = () => {
    // this.setState({
    //   toggleNewNote: !this.state.toggleNewNote
    // });
    this.props.toggleNewNote(!this.props.notes.generalUtil.toggleNewNote);
  };

  setCurrentNotetoFirstNote = firstNote => {
    this.setState({
      currentNoteObj: { ...firstNote }
      // newNote: { ...this.state.newNote, notebook_id: +defaultNotebookId }
    });
  };

  getSelectionDetails = (e, selectedNoteObj) => {
    this.setState({
      currentNoteObj: { ...selectedNoteObj, body: selectedNoteObj.body }
    });
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   axios
  //     .post(`/api/notes/${+this.state.newNote.notebook_id}`, this.state.newNote)
  //     .then(() => {
  //       this.setState({
  //         newNote: { ...this.state.newNote, title: "", body: "" }
  //       });
  //     })
  //     .then(() => {
  //       this.props.fetchNotebooks();
  //       this.props.fetchNotes();
  //     });
  // };

  // handleCancel = () => {
  //   // this.toggleNewNote();
  //   this.handleToggleNewNote();
  //   this.setState({
  //     newNote: { ...this.state.newNote, title: "", body: "" }
  //   });
  // };

  handleToggleViewNoteInfo = () => {
    this.setState({
      toggleViewNoteInfo: !this.state.toggleViewNoteInfo
    });
  };

  render() {

    console.log("STATE", this.state);
    console.log("PROPS", this.props);
    console.log("PROPS", this.props.location.pathname);

    let notes;
    if (this.props.notes.notes) {
      notes = Object.values(this.props.notes.notes).map((note, i) => {
        let updated_at = new Date(note.updated_at);
        let created_at = new Date(note.created_at);

        return (
          <div
            className="allNotesDiv"
            key={note.id}
            onClick={e => this.getSelectionDetails(e, note)}
          >
            <p>
              Id: {note.id}
              <br />
              Title: {note.title}
              <br />
              Body: {note.body}
              <br />
              {note.updated_at
                ? "Updated at " + updated_at
                : "Created at " + created_at}
              <br />
              Parent Notebook: {note.notebook_id}
              <br />
              Favorited:{String(note.favorited)}
            </p>
          </div>
        );
      });
    }

    return (
      <>
        <h1>All Notes</h1>
        {this.props.notes.generalUtil.toggleNewNote ? (
          <AddNoteDisplayContainer />
        ) : (
          <SingleNoteDisplay
            currentNoteObj={this.state.currentNoteObj}
            handleChange={this.handleChange}
            handleChangeTitle={this.handleChangeTitle}
            handleToggleViewNoteInfo={this.handleToggleViewNoteInfo}
            toggleViewNoteInfo={this.state.toggleViewNoteInfo}
          />
        )}
        <NotesDisplay notes={notes} />
      </>
    );
  }
}

// handleSubmit={this.handleSubmit}
