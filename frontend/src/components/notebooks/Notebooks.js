import React from "react";
import NotebooksDisplay from "./NotebooksDisplay.js";
import { AddNotebookDisplay } from "./AddNotebookDisplay.js";
import axios from "axios";
import "./Notebooks.css";

export default class Notebooks extends React.Component {
  state = {
    newNotebook: { title: "", is_default: false },
    notesFromNBMapped: [],
    notebookMappedId: null,
    noteCountInNotebooks: "",
    currentDefaultNotebook: "",
    toBeNewDefaultNotebook: ""
  };

  async componentDidMount() {
    await this.props.fetchNotebooks();
    await this.props.fetchNotes(); // in case user goes directly to /notebooks
    this.setNoteCount();
  }

  setNoteCount = async () => {
    let count = await this.noteCountTracker();
    await this.setState({
      noteCountInNotebooks: count
    });
  };

  noteCountTracker = () => {
    let output = {};

    Object.values(this.props.notebooks).forEach(notebook => {
      let allNotesInArrObj = Object.values(this.props.notes);
      //While in each note iterate through and if NB id match keep count in output otherwise create it
      for (let i = 0; i < allNotesInArrObj.length; i++) {
        if (allNotesInArrObj[i].notebook_id === notebook.id) {
          if (output[notebook.id]) {
            output[notebook.id] = output[notebook.id] + 1;
          } else {
            output[notebook.id] = 1;
          }
        }
      }
    });
    return output;
  };

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
      if (notebook_id !== this.state.notebookMappedId) {
        let notesFromNBMapped = Object.values(this.props.notesFromNB)
          .reverse()
          .map(note => {
            return (
              <div className="allNotesFromNB" key={note.id}>
                <ul>
                  <li onClick={e => this.onClickTest(e, note.id)}>
                    <i>{note.title}</i>
                  </li>
                </ul>
              </div>
            );
          });

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

  onClickTest = async (e, note_id) => {
    await this.props.receiveIdForSelectedNoteFromNotebook(note_id);
    this.props.history.push("/newNote");
  };

  handleDelete = async deleteId => {
    let notebook = Object.values(this.props.notebooks).find(
      notebook => notebook.id === deleteId
    );

    await axios.delete(`/api/notebooks/${notebook.id}`);
    await this.props.fetchNotebooks();
    await this.props.fetchNotes();
  };

  setInitialNotebookDefault = notebook => {
    if (this.state.currentDefaultNotebook === "") {
      this.setState({
        currentDefaultNotebook: notebook
      });
    }
  };

  handleNotebookDefault = async (e, notebook) => {
    // console.log('TO BE DEFAULT:',notebook);
    await this.setState({
      toBeNewDefaultNotebook: { ...notebook, is_default: true }
    });

    this.handleEditSubmit(notebook.id);

    console.log("boo", this.state.toBeNewDefaultNotebook);
    //axios call to back to change default value of old NB to false (handleSubmit?)
    //another axios call to change default value of selected NB to true
    //change state here to have newly defaulted NB ?? or does setInitialNotebookDefault takes care of it?
  };

  handleEditSubmit = async notebook_id => {
    await axios.patch(
      `/api/notebooks/${notebook_id}`,
      this.state.toBeNewDefaultNotebook
    );

    await axios.patch(
      `/api/notebooks/${this.state.currentDefaultNotebook.id}`,
      { ...this.state.currentDefaultNotebook, is_default: false }
    );

    this.props.fetchNotebooks();
  };

  render() {
    console.log("NB STATE!", this.state);
    let notebooks = Object.values(this.props.notebooks)
      .reverse()
      .map((notebook, i) => {
        //check for default nb and save in state
        if (notebook.is_default) {
          this.setInitialNotebookDefault(notebook);
        }
        let noteCountInNotebooks = this.state.noteCountInNotebooks[notebook.id];
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
              <li className="individualNotebookDiv">
                Id: {notebook.id} Title: <b>{notebook.title}</b>{" "}
                <i>({noteCountInNotebooks ? noteCountInNotebooks : 0})</i>
                {"      "}
                {notebook.is_default ? (
                  <label htmlFor="defaultNotebookCheckbox">
                    <input
                      id="defaultNotebookCheckbox"
                      className="defaultNotebookInput"
                      type="checkbox"
                      checked="checked"
                      disabled="disabled"
                    />
                    <span>Current Default Notebook</span>
                  </label>
                ) : (
                  <button
                    className="defaultNotebookButton"
                    value={notebook.is_default}
                    onClick={e => this.handleNotebookDefault(e, notebook)}
                  >
                    <span>Set as default notebook</span>
                  </button>
                )}
                <button onClick={() => this.handleDelete(notebook.id)}>
                  Delete notebook
                </button>
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
      <div className="notebooksMainWrapper">
        <h1>All Notebooks</h1>
        <NotebooksDisplay notebook={notebooks} />
        <AddNotebookDisplay
          newNotebook={this.state.newNotebook}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}
