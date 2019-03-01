import AddNoteDisplay from "../components/notes/AddNoteDisplay.js";
import { connect } from "react-redux";
import { fetchNotebooks } from "../actions/NotebooksActions.js";
// import {withRouter} from 'react-router';


const mapStateToProps = state => {
  return {
    notes: state.notes,
    notebooks: state.notebooks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNoteDisplay);
