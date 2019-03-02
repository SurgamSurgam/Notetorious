import React from "react";
import ReactQuill from "react-quill";
import axios from "axios";

class AddNoteDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNote: { title: "", body: "", notebook_id: "" },
      selectedNoteId: '',
    };
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount = async() =>{

    if (this.props.noteIdForSelectedNoteFromNotebook) {
      await this.setState({
        selectedNoteId: this.props.noteIdForSelectedNoteFromNotebook
      })
      if (this.state.selectedNoteId) {
        this.setNotebookSelectedNote()
      };
    };

    if (this.props.fetchNotebooks) {
      await this.props.fetchNotebooks();

      let defaultNotebook = Object.values(this.props.notebooks).find(
        notebook => notebook.is_default === true
      );

      this.setState({
        newNote: { ...this.state.newNote, notebook_id: +defaultNotebook.id }
      });
    };
  }

  handleNewNoteChange = e => {
    if (typeof e === "string") {
      this.setState({
        newNote: { ...this.state.newNote, body: e }
      });
    } else {
      this.setState({
        newNote: { ...this.state.newNote, title: e.target.value }
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/notes/${+this.state.newNote.notebook_id}`, this.state.newNote)
      .then(() => {
        this.setState({
          newNote: { ...this.state.newNote, title: "", body: "" }
        });
      })
      .then(() => {
        this.props.fetchNotebooks();
        this.props.fetchNotes();
      });
  };

  handleCancel = async () => {
    if (!this.state.selectedNoteId) {
      this.props.toggleNewNote(!this.props.notes.generalUtil.toggleNewNote);
    }

    this.setState({
      newNote: { ...this.state.newNote, title: "", body: "" }
    });
  };

  setNotebookSelectedNote = () => {
    let selectedNoteFromNotesFromNB = Object.values(this.props.notesFromNB).find(note => note.id === this.state.selectedNoteId);

    this.setState({
      newNote: {
        ...this.state.newNote,
        title: selectedNoteFromNotesFromNB.title,
        body: selectedNoteFromNotesFromNB.body,
        notebook_id: this.state.selectedNoteId
      }
    });
  };
  render() {
    let { newNote } = this.state;
    return (
      <div className="newNoteFormDiv">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newNote.title}
          onChange={this.handleNewNoteChange}
          required
        />
        <ReactQuill
          name="body"
          value={newNote.body}
          onChange={this.handleNewNoteChange}
          placeholder="Start writing/editing"
        />
        <button className="CancelAddNoteButton" onClick={this.handleCancel}>
          Cancel
        </button>
        <button className="addNoteButton" onClick={this.handleSubmit}>
          Continue
        </button>
      </div>
    );
  }
}

export default AddNoteDisplay;
