import AddNoteDisplay from "../components/notes/AddNoteDisplay.js";
import { connect } from "react-redux";
import { fetchNotebooks } from "../actions/NotebooksActions.js";
import { fetchNotes } from "../actions/NotesActions.js";
import {withRouter} from 'react-router'
import { toggleNewNote } from "../actions/NotesActions.js";;


const mapStateToProps = state => {

  return {
    notes: state.notes,
    notebooks: state.notebooks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchNotes: () => dispatch(fetchNotes()),
    toggleNewNote: (value) => dispatch(toggleNewNote(value))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNoteDisplay));
