import LogIn from "../components/auth/LogIn.js";
import { connect } from "react-redux";
import { checkAuthenticateStatus } from "../actions/AuthActions.js";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthenticateStatus: () => dispatch(checkAuthenticateStatus())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);


//goodbye


