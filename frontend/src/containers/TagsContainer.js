import Tags from "../components/tags/Tags.js";
import { connect } from "react-redux";
import { fetchTagsForCurrentUser } from "../actions/TagsActions.js";
import { fetchTagsOfEveryone } from "../actions/TagsActions.js";

const mapStateToProps = state => {
  return {
    allTagsForSingleUser: state.tags.allTagsForSingleUser,
    allTagsForEveryone: state.tags.allTagsForEveryone

  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTagsForCurrentUser: () => dispatch(fetchTagsForCurrentUser()),
    fetchTagsOfEveryone: () => dispatch(fetchTagsOfEveryone())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags);
