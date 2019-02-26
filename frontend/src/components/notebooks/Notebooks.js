import React from "react";
import { NotebooksDisplay } from "./NotebooksDisplay.js";
import { AddNotebookDisplay } from "./AddNotebookDisplay.js";
import axios from "axios";

export default class Notebooks extends React.Component {
  state = {
    newNotebook: { title: "", is_default: false },
  }

  componentDidMount() {
    this.props.fetchNotebooks();
  }

  handleChange = e => {
    console.log('handleChange',this.state);
    this.setState({
      newNotebook: {...this.state.newNotebook, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    axios
      .post("/api/notebooks", this.state.newNotebook)
      .then(() => {
        this.setState({
          newNotebook: { title: "", is_default: false }
        })
      })
      .then(()=> {
        this.props.fetchNotebooks();
      })
  };

  render() {
    console.log(this.state);
    let notebooks = Object.values(this.props.notebooks).map(notebook => {
      return (
        <div className="allNotebooksDiv" key={notebook.id}>
          <p>
            Id: {notebook.id} Title: {notebook.title} Defult NB: {String(notebook.is_default)}
          </p>
        </div>
      );
    });

    return (
      <>
        <h1>All Notebooks</h1>
        <NotebooksDisplay notebook={notebooks} />
        <AddNotebookDisplay newNotebook={this.state.newNotebook} handleChange={this.handleChange}
        handleSubmit={this.handleSubmit} />
      </>
    );
  }
}
