import React from "react";
import NotebooksDisplay from "./NotebooksDisplay.js";
import { AddNotebookDisplay } from "./AddNotebookDisplay.js";
import axios from "axios";

export default class Notebooks extends React.Component {
  state = {
    newNotebook: { title: "", is_default: false },
    notesFromNBMapped: [],
    notebookMappedId: null,
    noteCountInNotebooks: {},
    currentDefaultNotebook: '',
    toBeNewDefaultNotebook: ''
  };

  componentDidMount = async () => {
    await this.props.fetchNotebooks();
    await this.props.fetchNotes(); // in case user goes directly to /notebooks
    // this.setNoteCount();

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

  setInitialNotebookDefault = (notebook) => {
    if (this.state.currentDefaultNotebook === '') {
      this.setState({
        currentDefaultNotebook: notebook
      })
    }
  }

  handleNotebookDefault = async(e, notebook) => {
    // console.log('TO BE DEFAULT:',notebook);
    await this.setState({
      toBeNewDefaultNotebook: { ...notebook, is_default: true }
    })

    this.handleEditSubmit(notebook.id)

    console.log('boo', this.state.toBeNewDefaultNotebook);
    //axios call to back to change default value of old NB to false (handleSubmit?)
    //another axios call to change default value of selected NB to true
    //change state here to have newly defaulted NB ?? or does setInitialNotebookDefault takes care of it?

  }

  handleEditSubmit = async (notebook_id) => {
    await axios.patch(`/api/notebooks/${notebook_id}`, this.state.toBeNewDefaultNotebook)
    debugger;
    await axios.patch(`/api/notebooks/${this.state.currentDefaultNotebook.id}`, { ...this.state.currentDefaultNotebook, is_default: false })

    this.props.fetchNotebooks();
  }

  render() {

    console.log('NB STATE!', this.state);
    let notebooks = Object.values(this.props.notebooks).reverse().map((notebook, i) => {
      //check for default nb and save in state
      if (notebook.is_default) {
        this.setInitialNotebookDefault(notebook)
      }

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

              {notebook.is_default ? (  <label htmlFor="defaultNotebookCheckbox">
                  <input id='defaultNotebookCheckbox' className= 'defaultNotebookInput' type="checkbox" checked="checked" disabled="disabled"/>
                  <span>Current Default Notebook</span>
                </label>):(

                    <button className= 'defaultNotebookButton' value={notebook.is_default} onClick={(e)=>this.handleNotebookDefault(e,notebook)}>
                      <span>Set as default notebook</span>
                    </button>


                  )}

              <button onClick={()=>this.handleDelete(notebook.id)}>Delete notebook</button>
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
