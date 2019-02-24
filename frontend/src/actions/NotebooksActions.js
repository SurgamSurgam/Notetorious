import * as Utils from "../utils/Utils.js";
import { RECEIVE_ALL_NOTEBOOKS } from "./actionTypes";

export const receiveAllNotebooks = notebooks => {
  return { type: RECEIVE_ALL_NOTEBOOKS, notebooks };
};

export const fetchNotebooks = () => dispatch => {
  return Utils.getAllNotebooks().then(notebooks => {
    return dispatch(receiveAllNotebooks(notebooks.data.body));
  });
};
