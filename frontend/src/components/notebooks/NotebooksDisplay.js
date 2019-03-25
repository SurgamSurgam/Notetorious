import React from "react";

class NotebooksDisplay extends React.Component {
  render() {
    if (!!this.props.notebook.length) {
      return (
        <div className="tableDiv">
          <table>
            <thead>
              <tr className="theadRow">
                <th>Title</th>
                <th>Default State</th>
                <th>Delete</th>
              </tr>
            </thead>
          </table>
          {this.props.notebook}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default NotebooksDisplay;
