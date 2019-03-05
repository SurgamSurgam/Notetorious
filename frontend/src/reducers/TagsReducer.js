import { RECEIVE_ALL_TAGS_FROM_SINGLE_USER } from "../actions/actionTypes.js";
import { RECEIVE_ALL_TAGS_FROM_EVERYONE } from "../actions/actionTypes.js";
import merge from "lodash/merge";

const normalizeData = arr => {
  let obj = {};
  arr.forEach(item => {
    obj[item.id] = item;
  });
  return obj;
};

const TagsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_TAGS_FROM_SINGLE_USER:
      let newState1 = merge({}, oldState);
      return {
        ...newState1, allTagsForSingleUser: normalizeData(action.tags)
      }
    case RECEIVE_ALL_TAGS_FROM_EVERYONE:
      let newState2 = merge({}, oldState);
      return {
        ...newState2, allTagsForEveryone: normalizeData(action.tags)
      }
    default:
      return oldState;
  }
};

export default TagsReducer;
