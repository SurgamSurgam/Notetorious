import Notebooks from "../components/notebooks/Notebooks.js";
import { connect } from "react-redux";
import { fetchNotebooks } from "../actions/NotebooksActions.js";
import { fetchAllNotesFromSingleNotebook } from "../actions/NotesActions.js";
import { receiveIdForSelectedNoteFromNotebook } from "../actions/NotebooksActions.js";

const mapStateToProps = state => {
  return {
    notebooks: state.notebooks,
    notesFromNB: state.notes.notesFromNB,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchAllNotesFromSingleNotebook: notebook_id =>
      dispatch(fetchAllNotesFromSingleNotebook(notebook_id)),
    receiveIdForSelectedNoteFromNotebook: note_id =>
      dispatch(receiveIdForSelectedNoteFromNotebook(note_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebooks);
