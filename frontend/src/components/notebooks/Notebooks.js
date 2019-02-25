import React from "react";
import { NotebooksDisplay } from "./NotebooksDisplay.js";

export default class Notebooks extends React.Component {
  componentDidMount() {
    this.props.fetchNotebooks();
  }

  render() {
    let notebooks = Object.values(this.props.notebooks).map(notebook => {
      return (
        <div className="allNotebooksDiv" key={notebook.id}>
          <p>
            Id: {notebook.id} Title: {notebook.title}
          </p>
        </div>
      );
    });

    return (
      <>
        <h1>All Notebooks</h1>
        <NotebooksDisplay notebook={notebooks} />
      </>
    );
  }
}
