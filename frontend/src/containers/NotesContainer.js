import Notes from "../components/notes/Notes.js";
import { connect } from "react-redux";
import { fetchNotes } from "../actions/NotesActions.js";

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
