import Notebooks from "../components/Notebooks.js";
import { connect } from "react-redux";
import { fetchNotebooks } from "../actions/NotebooksActions.js";

const mapStateToProps = state => {
  return {
    notebooks: state.notebooks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebooks);
