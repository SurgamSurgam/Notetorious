import { RECEIVE_USER } from "../actions/actionTypes.js";

const AuthReducer = (state = {}, action) => {
  Object.freeze(state);
  console.log("AUTH REDUCER OLD STATE:", state);
  console.log("AUTH REDUCER ACTION:", action);
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    default:
      return state;
  }
};

export default AuthReducer;
