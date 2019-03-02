import React from "react";
import NotebooksDisplay from "./NotebooksDisplay.js";
import { AddNotebookDisplay } from "./AddNotebookDisplay.js";
// import { AddNoteDisplay } from "../notes/AddNoteDisplay.js";
import axios from "axios";

export default class Notebooks extends React.Component {
  state = {
    newNotebook: { title: "", is_default: false },
    notesFromNBMapped: [],
    notebookMappedId: null
  };

  componentDidMount() {
    this.props.fetchNotebooks();
  }

  handleChange = e => {
    this.setState({
      newNotebook: {
        ...this.state.newNotebook,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/api/notebooks", this.state.newNotebook)
      .then(() => {
        this.setState({
          newNotebook: { title: "", is_default: false }
        });
      })
      .then(() => {
        this.props.fetchNotebooks();
      });
  };

  handleCancel = () => {
    this.setState({
      newNotebook: { title: "", is_default: false }
    });
  };

  getNotesByNB = notebook_id => {
    if (!!this.props.notesFromNB) {
      let notesFromNBMapped = Object.values(this.props.notesFromNB).map(
        note => {
          return (
            <div className="allNotesFromNB" key={note.id}>
              <ul>
                <li>{note.title}</li>
              </ul>
            </div>
          );
        }
      );

      this.setState({
        notesFromNBMapped: notesFromNBMapped,
        notebookMappedId: notebook_id
      });
    }
  };

  render() {
    let notebooks = Object.values(this.props.notebooks).map(notebook => {
      return (
        <div
          className="allNotebooksDiv"
          key={notebook.id}
          onClick={async () => {
            await this.props.fetchAllNotesFromSingleNotebook(notebook.id);
            this.getNotesByNB(notebook.id);
          }}
        >
          <ul>
            <li>
              Id: {notebook.id} Title: {notebook.title} Default NB:{" "}
              {String(notebook.is_default)} #ofNotes:{}
            </li>
            <ul className="notesForNbUl">
              <li>
                {this.state.notebookMappedId === notebook.id
                  ? this.state.notesFromNBMapped
                  : null}
              </li>
            </ul>
          </ul>
        </div>
      );
    });

    return (
      <>
        <h1>All Notebooks</h1>
        <NotebooksDisplay notebook={notebooks} />
        <AddNotebookDisplay
          newNotebook={this.state.newNotebook}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
        />
        {/*<AddNoteDisplay/>*/}
      </>
    );
  }
}
