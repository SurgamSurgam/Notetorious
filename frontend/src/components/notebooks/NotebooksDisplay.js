import React from "react";

class NotebooksDisplay extends React.Component {
  render() {
    if (!!this.props.notebook.length) {
      return <div>{this.props.notebook}</div>;
    } else {
      return null;
    }
  }
}

export default NotebooksDisplay;
