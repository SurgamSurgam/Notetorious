import React from "react";
import { NotesDisplay } from "./NotesDisplay.js";
import { SingleNoteDisplay } from "./SingleNoteDisplay.js";
// import { AddNotebookDisplay } from "./AddNotebookDisplay.js";
import axios from "axios";

export default class Notes extends React.Component {
  componentDidMount() {
    this.props.fetchNotes();
  }
  //
  // handleChange = e => {
  //   this.setState({
  //     newNote: {
  //       ...this.state.newNote,
  //       [e.target.name]: e.target.value
  //     }
  //   });
  // };
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
    // console.log(this.state);
    let firstNote;
    let notes = Object.values(this.props.notes).map((note, i) => {
      let updated_at = new Date(note.updated_at);
      let created_at = new Date(note.created_at);
      if (i === 0) {firstNote = note}

      return (
        <div className="allNotesDiv" key={note.id}>
          <p>
            Id: {note.id}
            <br/>
            Title: {note.title}
            <br/>
            Body: {note.body}
            <br/>
            {updated_at ? 'Updated at ' + updated_at : 'Created at ' + created_at}
            <br/>
            Favorited:{String(note.favorited)}
          </p>
        </div>
      );
    });

    return (
      <>
        <h1>All Notes</h1>
        <SingleNoteDisplay firstNote={firstNote} />
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
