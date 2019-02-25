import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContainer from "./containers/AppContainer.js";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import RootReducer from "./reducers/RootReducer.js";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

let initalState = {
  auth: {
    user: null,
    isLoggedIn: false
  }
};

let store = createStore(
  RootReducer,
  initalState,
  applyMiddleware(thunk, logger)
);

window.store = store;

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
