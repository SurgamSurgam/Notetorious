import { RECEIVE_ALL_NOTEBOOKS } from "../actions/actionTypes.js";

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
    default:
      return oldState;
  }
};

export default NotebooksReducer;
