import Tags from "../components/tags/Tags.js";
import { connect } from "react-redux";
import { fetchTags } from "../actions/TagsActions.js";

const mapStateToProps = state => {
  return {
    tags: state.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTags: () => dispatch(fetchTags())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags);
