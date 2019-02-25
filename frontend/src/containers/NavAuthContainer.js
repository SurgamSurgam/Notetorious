import { Navbar } from "../components/layout/Navbar.js";
import { connect } from "react-redux";
import { checkAuthenticateStatus } from "../actions/AuthActions.js";
import { logoutUser } from "../actions/AuthActions.js";

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthenticateStatus: () => dispatch(checkAuthenticateStatus()),
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
