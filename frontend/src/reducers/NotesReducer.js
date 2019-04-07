import { RECEIVE_ALL_NOTES } from "../actions/actionTypes.js";
import { TOGGLE_NEW_NOTE } from "../actions/actionTypes.js";
import { RECEIVE_ALL_NOTES_FROM_SINGLE_NOTEBOOK } from "../actions/actionTypes.js";
import merge from "lodash/merge";

//also causes losing ORDER BY order as it rearranges items in an obj
const normalizeData = arr => {
  let obj = {};
  arr.forEach(item => {
    obj[item.id] = item;
  });
  return obj;
};

const initialState = {
  generalUtil: { toggleNewNote: false },
  toolbarOptions: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["spanblock"]["clean"] // remove formatting button
  ]
};

const NotesReducer = (oldState = initialState, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_NOTES:
      let newState1 = merge({}, oldState);
      return {
        ...newState1,
        notes: normalizeData(action.notes)
      };
    case TOGGLE_NEW_NOTE:
      let newState2 = merge({}, oldState);
      return {
        ...newState2,
        generalUtil: { toggleNewNote: action.value }
      };
    case RECEIVE_ALL_NOTES_FROM_SINGLE_NOTEBOOK:
      let newState3 = merge({}, oldState);
      return {
        ...newState3,
        notesFromNB: normalizeData(action.notes)
      };
    default:
      return oldState;
  }
};

export default NotesReducer;
