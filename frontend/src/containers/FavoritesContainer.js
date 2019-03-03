import Favorites from "../components/favorites/Favorites.js";
import { connect } from "react-redux";
import { fetchNotes } from "../actions/NotesActions.js";
import { fetchNotebooks } from "../actions/NotebooksActions.js";
import { receiveIdForSelectedNoteFromNotebook } from "../actions/NotebooksActions.js";

const mapStateToProps = state => {
  return {
    notes: state.notes,
    notebooks: state.notebooks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    receiveIdForSelectedNoteFromFavorites: note_id =>
      dispatch(receiveIdForSelectedNoteFromNotebook(note_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
