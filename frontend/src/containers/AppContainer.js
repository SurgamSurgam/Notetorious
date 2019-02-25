import App from "../App.js";
import { connect } from "react-redux";
import { checkAuthenticateStatus } from "../actions/AuthActions.js";
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthenticateStatus: () => dispatch(checkAuthenticateStatus())
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
