import * as Utils from "../utils/Utils.js";
import { RECEIVE_ALL_NOTEBOOKS } from "./actionTypes";
import { RECEIVE_ID_FOR_NOTE_SELECTED_FROM_ALL_NOTEBOOKS } from "./actionTypes";

export const receiveAllNotebooks = notebooks => {
  return { type: RECEIVE_ALL_NOTEBOOKS, notebooks };
};

export const receiveIdForSelectedNoteFromNotebook = id => {
  return { type: RECEIVE_ID_FOR_NOTE_SELECTED_FROM_ALL_NOTEBOOKS, id };
};

export const fetchNotebooks = () => dispatch => {
  return Utils.getAllNotebooks().then(notebooks => {
    return dispatch(receiveAllNotebooks(notebooks.data.body));
  });
};
