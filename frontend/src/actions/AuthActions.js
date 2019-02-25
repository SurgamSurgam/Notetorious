import Auth from "../utils/Auth.js";
import axios from "axios";
import { RECEIVE_USER } from "./actionTypes";

export const receiveUserStatus = user => {
  console.log("AUTH ACTIONS !!", user);
  return { type: RECEIVE_USER, user };
};


export const checkAuthenticateStatus = () => dispatch => {
  return axios.get("/sessions/isLoggedIn").then(user => {
    if (user.data.username === Auth.getToken()) {
      return dispatch(
        receiveUserStatus({
          isLoggedIn: Auth.isUserAuthenticated(),
          user: Auth.getToken()
        })
      );
    } else {
      if (user.data.username) {
        logoutUser();
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
      dispatch(
        receiveUserStatus({
          isLoggedIn: false,
          user: null
        })
      );
    });
};
