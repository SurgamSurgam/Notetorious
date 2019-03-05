import * as Utils from "../utils/Utils.js";
import { RECEIVE_ALL_TAGS_FROM_SINGLE_USER } from "./actionTypes";
import { RECEIVE_ALL_TAGS_FROM_EVERYONE } from "./actionTypes";

export const receiveAllTagsFromSingleUser = tags => {
  return { type: RECEIVE_ALL_TAGS_FROM_SINGLE_USER, tags };
};

export const receiveAllTagsFromEveryone = tags => {
  return { type: RECEIVE_ALL_TAGS_FROM_EVERYONE, tags };
};

export const fetchTagsForCurrentUser = () => dispatch => {
  return Utils.getAllTagsForCurrentUser().then(tags => {
    return dispatch(receiveAllTagsFromSingleUser(tags.data.body));
  });
};

export const fetchTagsOfEveryone = () => dispatch => {
  return Utils.getAllTagsFromEveryone().then(tags => {
    return dispatch(receiveAllTagsFromEveryone(tags.data.body));
  });
};
