import React from "react";
import { connect } from "react-redux";
import ReactHtmlParser from "html-react-parser";
import TimeAgo from "react-timeago";

const mapStateToProps = state => {
  return {
    savedSearchResults: state.notebooks.savedSearchResults
  };
};

// {Object.values(this.props.notes.notes)}
class NotesDisplay extends React.Component {
  render() {
    if (this.props.savedSearchResults.length) {
      let searchedResults = Object.values(this.props.savedSearchResults)
        .reverse()
        .map(note => {
          let updated_at = new Date(note.updated_at);
          // let created_at = new Date(note.created_at);
          // let updated_at = <TimeAgo date={note.updated_at} />;
          // let created_at = <TimeAgo date={note.created_at} />;

          const htmlString = note.body;

          return (
            <div className="allNotesDiv" key={note.id}>
              <div
                className="allNotesContentInnerDiv"
                onClick={e => this.getSelectionDetails(e, note)}
              >
                <ul>
                  <li className="noteTitleLiWrapper">
                    <div className="noteTitleLi">{note.title}</div>
                  </li>

                  <li className="noteBodyLi">{ReactHtmlParser(htmlString)}</li>
                  <li className="timeStampLi">
                    {note.updated_at ? (
                      "Updated at " + updated_at
                    ) : (
                      <TimeAgo date={note.created_at} />
                    )}
                  </li>
                </ul>
              </div>
            </div>
          );
        });
      return <div className="searchedResultsDiv">{searchedResults}</div>;
    } else if (!!this.props.notes) {
      return <div className="allNotesDivWrapper">{this.props.notes}</div>;
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
  null
)(NotesDisplay);
