import { RECEIVE_ID_FOR_SELECTED_NOTE_FROM_FAVORITES } from "../actions/actionTypes.js";

const FavoritesReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ID_FOR_SELECTED_NOTE_FROM_FAVORITES:
      return {
        noteIdForSelectedNoteFromFavorites: action.id
      };
    default:
      return oldState;
  }
};

export default FavoritesReducer;
