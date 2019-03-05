import { RECEIVE_ID_FOR_SELECTED_NOTE_FROM_FAVORITES } from "./actionTypes";

export const receiveIdForSelectedNoteFromFavorites = id => {
  return { type: RECEIVE_ID_FOR_SELECTED_NOTE_FROM_FAVORITES, id };
};
