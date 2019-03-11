import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    notes: state.notes,
    notebooks: state.notebooks,
    savedSearchResults: state.notebooks.savedSearchResults
  };
};

// {Object.values(this.props.notes.notes)}
class NotesDisplay extends React.Component {
  render() {
    debugger;
    if (!!this.props.notes) {
      return <div className="allNotesDivWrapper" />;
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
  null
)(NotesDisplay);
