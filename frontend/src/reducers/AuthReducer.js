import { USER_STATUS } from "../actions/actionTypes.js";

const initalState = {};

const AuthReducer = (state = initalState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case USER_STATUS:
      return action.user;
    default:
      return state;
  }
};

export default AuthReducer;
