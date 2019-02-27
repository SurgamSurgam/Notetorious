import { RECEIVE_ALL_NOTES } from "../actions/actionTypes.js";

const normalizeData = arr => {
  let obj = {};
  arr.forEach(item => {
    obj[item.id] = item;
  });
  return obj;
};

const NotesReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_NOTES:
      return normalizeData(action.notes);
    default:
      return oldState;
  }
};

export default NotesReducer;
