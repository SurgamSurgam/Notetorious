import React from "react";
import { NotesDisplay } from "./NotesDisplay.js";
// import { SingleNoteDisplay } from "./SingleNoteDisplay.js";
// import { AddNotebookDisplay } from "./AddNotebookDisplay.js";
import ReactQuill from "react-quill";
import axios from "axios";

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNoteObj: ""
      // newNotebook: { title: "", is_default: false }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchNotes();

    let notes = Object.values(this.props.notes).find((note, i) => i === 0);

    if (notes) {
      this.setCurrentNotetoFirstNote(notes);
    }
  }

  handleChange = e => {
    this.setState({
      currentNoteObj: { ...this.state.currentNoteObj, body: e }
    });
  };

  setCurrentNotetoFirstNote = firstNote => {
    this.setState({
      currentNoteObj: { ...firstNote }
    });
  };

  getSelectionDetails =(e, selectedNoteObj) => {
    debugger;
    this.setState({
      currentNoteObj: { ...selectedNoteObj, body: selectedNoteObj.body }
    })
  }
  //
  // handleSubmit = e => {
  //   e.preventDefault();
  //   axios
  //     .post("/api/notebooks", this.state.newNote)
  //     .then(() => {
  //       this.setState({
  //         newNote: { title: "", favorited: false }
  //       });
  //     })
  //     .then(() => {
  //       this.props.fetchNotebooks();
  //     });
  // };

  render() {
    console.log('STATE', this.state);
    let notes = Object.values(this.props.notes).map((note, i) => {
      let updated_at = new Date(note.updated_at);
      let created_at = new Date(note.created_at);

      return (
        <div className="allNotesDiv" key={note.id} onClick={(e)=>this.getSelectionDetails(e, note)}>
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
            Favorited:{String(note.favorited)}
          </p>
        </div>
      );
    });

    return (
      <>
        <h1>All Notes</h1>
        {/*<SingleNoteDisplay
          currentNoteObj={this.state.currentNoteObj}
          handleChange={this.handleChange}
        />*/}

        {this.state.currentNoteObj.body ? (
          <ReactQuill
            value={this.state.currentNoteObj.body}
            onChange={this.handleChange}
            placeholder="Start writing/editing"
          />
        ) : (
          console.log("hell")
        )}

        <NotesDisplay notes={notes} />
        {/*<AddNotebookDisplay
          newNotebook={this.state.newNotebook}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />*/}
      </>
    );
  }
}
