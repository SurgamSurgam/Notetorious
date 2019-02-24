import { combineReducers } from "redux";
// import UsersReducer from './UsersReducer.js';
import NotebooksReducer from "./NotebooksReducer.js";
// import NotesReducer from './NotesReducer.js';
// import TagsReducer from './TagsReducer.js';
// import SessionsReducer from './SessionsReducer.js';
import AuthReducer from "./AuthReducer.js";

const RootReducer = combineReducers({
  // users: UsersReducer,
  notebooks: NotebooksReducer,
  // notes: NotesReducer,
  // tags: TagsReducer,
  // sessions: SessionsReducer
  auth: AuthReducer
});

export default RootReducer;
