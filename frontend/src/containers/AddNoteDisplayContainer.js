import AddNoteDisplay from "../components/notes/AddNoteDisplay.js";
import { connect } from "react-redux";
import { fetchNotebooks } from "../actions/NotebooksActions.js";
import { fetchNotes } from "../actions/NotesActions.js";
import { withRouter } from "react-router";
import { toggleNewNote } from "../actions/NotesActions.js";
import { fetchAllNotesFromSingleNotebook } from "../actions/NotesActions.js";

const mapStateToProps = (state, ownProps) => {
  debugger;
  return {
    notes: state.notes,
    notebooks: state.notebooks,
    notesFromNB: state.notes.notesFromNB,
    noteIdForSelectedNoteFromNotebook:
      state.notebooks.noteIdForSelectedNoteFromNotebook,
    noteIdForSelectedNoteFromFavorites:
      state.notebooks.noteIdForSelectedNoteFromNotebook,
    setCurrentNotetoFirstNote: ownProps.setCurrentNotetoFirstNote,
    toolbarOptions: state.notes.toolbarOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchNotes: () => dispatch(fetchNotes()),
    toggleNewNote: value => dispatch(toggleNewNote(value)),
    fetchAllNotesFromSingleNotebook: notebook_id =>
      dispatch(fetchAllNotesFromSingleNotebook(notebook_id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddNoteDisplay)
);
