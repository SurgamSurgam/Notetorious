import * as Utils from "../utils/Utils.js";
import { RECEIVE_ALL_NOTES } from "./actionTypes";
import { TOGGLE_NEW_NOTE } from "./actionTypes";

export const receiveAllNotes = notes => {
  return { type: RECEIVE_ALL_NOTES, notes };
};

export const toggleNewNote = value => {
  return { type: TOGGLE_NEW_NOTE, value };
};

export const fetchNotes = () => dispatch => {
  return Utils.getAllNotes().then(notes => {
    return dispatch(receiveAllNotes(notes.data.body));
  });
};
