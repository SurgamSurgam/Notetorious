import * as Utils from "../utils/Utils.js";
import Auth from "../utils/Auth.js";
import { USER_STATUS } from "./actionTypes";

export const receiveUserStatus = user => {
  return { type: USER_STATUS, user };
};

export const checkAuthenticateStatus = () => dispatch => {
  return axios.get("/sessions/isLoggedIn").then(user => {
    if (user.data.username === Auth.getToken()) {
      return dispatch receiveUserStatus({
        isLoggedIn: Auth.isUserAuthenticated(),
        user: Auth.getToken()
      })
    } else {
      if (user.data.username) {
        this.logoutUser();
      } else {
        Auth.deauthenticateUser();
      }
    }
  });
};

export const logoutUser = () => dispatch => {
  return axios
    .post("/sessions/logout")
    .then(() => {
      Auth.deauthenticateUser();
    })
    .then(() => {
      checkAuthenticateStatus();
    });
}
