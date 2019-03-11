import { RECEIVE_ALL_NOTEBOOKS } from "../actions/actionTypes.js";
import { RECEIVE_ID_FOR_NOTE_SELECTED_FROM_ALL_NOTEBOOKS } from "../actions/actionTypes.js";
import { RECEIVE_SEARCH_RESULTS } from "../actions/actionTypes.js";
import merge from "lodash/merge";

const normalizeData = arr => {
  let obj = {};
  arr.forEach(item => {
    obj[item.id] = item;
  });
  return obj;
};

// implement this into new state in a way easily accessible by all components:
//================== GOOD CODE BELOW
// const isDefault = obj => {
// 	let result = Object.values(obj).filter( notebook => {
// 		return notebook.is_default
// 	})
// 	return result[0].title
// }
//================== GOOD CODE ABOVE

const NotebooksReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_NOTEBOOKS:
      return normalizeData(action.notebooks);
    case RECEIVE_ID_FOR_NOTE_SELECTED_FROM_ALL_NOTEBOOKS:
      let newState1 = merge({}, oldState);
      return {
        ...newState1,
        noteIdForSelectedNoteFromNotebook: action.id
      };
    case RECEIVE_SEARCH_RESULTS:
      let newState2 = merge({}, oldState);
      return {
        ...newState2,
        savedSearchResults: action.results
      };
    default:
      return oldState;
  }
};

export default NotebooksReducer;
