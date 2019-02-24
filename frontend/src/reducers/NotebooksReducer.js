import { RECEIVE_ALL_NOTEBOOKS } from "../actions/actionTypes.js";

const normalizeData = arr => {
  let obj = {};
  arr.forEach(item => {
    obj[item.id] = item;
  });
  return obj;
};

const NotebooksReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_NOTEBOOKS:
      return normalizeData(action.notebooks);
    default:
      return oldState;
  }
};

export default NotebooksReducer;
