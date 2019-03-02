import Notes from "../components/notes/Notes.js";
import { connect } from "react-redux";
import { fetchNotes } from "../actions/NotesActions.js";
import { toggleNewNote } from "../actions/NotesActions.js";
import { fetchNotebooks } from "../actions/NotebooksActions.js";


const mapStateToProps = state => {
  return {
    notes: state.notes,
    notebooks: state.notebooks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    toggleNewNote: (value) => dispatch(toggleNewNote(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);