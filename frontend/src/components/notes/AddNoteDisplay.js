import React from "react";
import ReactQuill from "react-quill";
import axios from "axios";
// import {withRouter} from 'react-router';

class AddNoteDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNote: { title: "", body: "", notebook_id: "" }
    };
  }

  async componentDidMount() {
    console.log('CDM!!!!');
    if (this.props.fetchNotebooks) {
      await this.props.fetchNotebooks();

      let defaultNotebook = Object.values(this.props.notebooks).find(
        notebook => notebook.is_default === true
      );

      this.setState({
        newNote: { ...this.state.newNote, notebook_id: +defaultNotebook.id }
      })
    }
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
    this.props.fetchNotes();
    axios
      .post(`/api/notes/${+this.state.newNote.notebook_id}`, this.state.newNote)
      .then(() => {
        this.setState({
          newNote: { ...this.state.newNote, title: "", body: "" }
        });
      })
      .then(() => {
        this.props.fetchNotebooks();

      });
  };

  handleCancel = () => {
    this.props.handleToggleNewNote();

    // this.handleToggleNewNote();
    this.setState({
      newNote: { ...this.state.newNote, title: "", body: "" }
    });
  };

  render() {
debugger;
    console.log(this.state);
    let { newNote } = this.state
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
    )
  }
}

export default AddNoteDisplay;
