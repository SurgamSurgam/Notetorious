import { RECEIVE_ALL_NOTES } from "../actions/actionTypes.js";
import { TOGGLE_NEW_NOTE } from "../actions/actionTypes.js";
import merge from 'lodash/merge';

const normalizeData = arr => {
  let obj = {};
  arr.forEach(item => {
    obj[item.id] = item;
  });
  return obj;
};

const initialState = {
    generalUtil: { toggleNewNote: false }
}

const NotesReducer = (oldState = initialState, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_NOTES:
      let newState1 = merge({}, oldState);
      return {
        ...newState1, notes: normalizeData(action.notes)
      }
    case TOGGLE_NEW_NOTE:
      let newState2 = merge({}, oldState);
      return {
        ...newState2, generalUtil: {toggleNewNote: action.value}
      }
    default:
      return oldState;
  }
};

export default NotesReducer;
