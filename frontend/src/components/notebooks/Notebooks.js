import React from "react";
import { NotebooksDisplay } from "./NotebooksDisplay.js";
import { AddNotebookDisplay } from "./AddNotebookDisplay.js";
// import { AddNoteDisplay } from "../notes/AddNoteDisplay.js";
import axios from "axios";

export default class Notebooks extends React.Component {
  state = {
    newNotebook: { title: "", is_default: false }
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

  render() {
    console.log(this.state);
    let notebooks = Object.values(this.props.notebooks).map(notebook => {
      return (
        <div className="allNotebooksDiv" key={notebook.id}>
          <p>
            Id: {notebook.id} Title: {notebook.title} Default NB:{" "}
            {String(notebook.is_default)}
          </p>
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
