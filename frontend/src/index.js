import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import RootReducer from "./reducers/RootReducer.js";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

let store = createStore(RootReducer, {}, applyMiddleware(thunk, logger));

// window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
