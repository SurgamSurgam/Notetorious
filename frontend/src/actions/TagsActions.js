import * as Utils from "../utils/Utils.js";
import { RECEIVE_ALL_TAGS } from "./actionTypes";

export const receiveAllTags = tags => {
  return { type: RECEIVE_ALL_TAGS, tags };
};

export const fetchTags = () => dispatch => {
  return Utils.getAllTags().then(tags => {
    return dispatch(receiveAllTags(tags.data.body));
  });
};
