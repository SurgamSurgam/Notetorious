import Favorites from "../components/favorites/Favorites.js";
import { connect } from "react-redux";
import { fetchNotes } from "../actions/NotesActions.js";
import { fetchNotebooks } from "../actions/NotebooksActions.js";
import { receiveIdForSelectedNoteFromFavorites } from "../actions/FavoritesActions.js";

const mapStateToProps = state => {
  debugger;
  return {
    notes: state.notes,
    notebooks: state.notebooks.notebooks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    receiveIdForSelectedNoteFromFavorites: note_id =>
      dispatch(receiveIdForSelectedNoteFromFavorites(note_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
