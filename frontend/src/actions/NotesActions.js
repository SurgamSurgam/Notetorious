import * as Utils from "../utils/Utils.js";
import { RECEIVE_ALL_NOTES } from "./actionTypes";
import { TOGGLE_NEW_NOTE } from "./actionTypes";
import { RECEIVE_ALL_NOTES_FROM_SINGLE_NOTEBOOK } from "./actionTypes";
import axios from "axios";

export const receiveAllNotes = notes => {
  return { type: RECEIVE_ALL_NOTES, notes };
};

export const toggleNewNote = value => {
  return { type: TOGGLE_NEW_NOTE, value };
};

export const receiveAllNotesFromSingleNotebook = notes => {
  return { type: RECEIVE_ALL_NOTES_FROM_SINGLE_NOTEBOOK, notes };
};

export const fetchNotes = () => dispatch => {
  return Utils.getAllNotes().then(notes => {
    return dispatch(receiveAllNotes(notes.data.body));
  });
};

export const fetchAllNotesFromSingleNotebook = notebook_id => dispatch => {
  return axios.get(`/api/notes/${notebook_id}`).then(notes => {
    return dispatch(receiveAllNotesFromSingleNotebook(notes.data.body));
  });
};
