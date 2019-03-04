import React from "react";
import NotebooksDisplay from "./NotebooksDisplay.js";
import { AddNotebookDisplay } from "./AddNotebookDisplay.js";
import axios from "axios";

export default class Notebooks extends React.Component {
  state = {
    newNotebook: { title: "", is_default: false },
    notesFromNBMapped: [],
    notebookMappedId: null,
    noteCountinNotebooks: {}
  };

  componentDidMount = async () => {
    await this.props.fetchNotebooks();
    await this.props.fetchNotes(); // in case user goes directly to /notebooks
    this.setNoteCount();

  }

  setNoteCount = () => {
    debugger;
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
    debugger;
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
      if (notebook_id !== this.state.notebookMappedId) {
        let notesFromNBMapped = Object.values(this.props.notesFromNB).reverse().map(
          note => {
            return (
              <div
                className="allNotesFromNB"
                key={note.id}
                onClick={this.onClickTest}
              >
                <ul>
                  <li value={note.id}>{note.title}</li>
                </ul>
              </div>
            );
          }
        );

        this.setState({
          notesFromNBMapped: notesFromNBMapped,
          notebookMappedId: notebook_id
        });
      } else {
        this.setState({
          notesFromNBMapped: [],
          notebookMappedId: ""
        });
      }
    }
  };

  onClickTest = async e => {
    await this.props.receiveIdForSelectedNoteFromNotebook(+e.target.value);
    this.props.history.push("/newNote");
  };

  handleDelete = async (deleteId) => {
    debugger;
    let notebook = Object.values(this.props.notebooks).find(
      (notebook) => notebook.id === deleteId
    );

    await axios.delete(`/api/notebooks/${notebook.id}`)
    await this.props.fetchNotebooks();
    await this.props.fetchNotes();
  }

  render() {
    console.log(this.state);
    let notebooks = Object.values(this.props.notebooks).reverse().map((notebook, i) => {
      return (
        <div
          className="allNotebooksDiv"
          key={i}
          onClick={async () => {
            await this.props.fetchAllNotesFromSingleNotebook(notebook.id);
            this.getNotesByNB(notebook.id);
          }}
        >
          <ul>
            <li className='individualNotebookDiv'>
              Id: {notebook.id} Title: <b>{notebook.title}</b> Default NB:{" "}
              {String(notebook.is_default)} Note Count:{' '}
              <button onClick={()=>this.handleDelete(notebook.id)}>Delete note</button>
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
      </>
    );
  }
}
