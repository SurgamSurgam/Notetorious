import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NavHorizontalAuthContainer from "./containers/NavHorizontalAuthContainer.js";
import NavSidewaysAuthContainer from "./containers/NavSidewaysAuthContainer.js";
// import NotebooksContainer from "./containers/NotebooksContainer.js";
// import NotesContainer from "./containers/NotesContainer.js";
// import TagsContainer from "./containers/TagsContainer.js";
import LandingPage from "./components/landing/LandingPage.js";
import LogInAuthContainer from "./containers/LogInAuthContainer.js";
import SignInAuthContainer from "./containers/SignInAuthContainer.js";
import { PrivateRoute, MainPagePrivateRoute } from "./utils/AuthRouting";
// import AddNoteDisplayContainer from "./containers/AddNoteDisplayContainer.js";
// import FavoritesContainer from "./containers/FavoritesContainer.js";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.checkAuthenticateStatus();
  }

  render() {
    console.log("APP PROPS!", this.props);

    return (
      <div className="App">
        <Route component={NavHorizontalAuthContainer} />
        <Switch>
          <MainPagePrivateRoute exact path="/" component={LandingPage} />
          <MainPagePrivateRoute path="/login" component={LogInAuthContainer} />
          <MainPagePrivateRoute
            path="/signup"
            component={SignInAuthContainer}
          />
        </Switch>

        <PrivateRoute
          exact
          path={"/(newNote|favorites|notes|notebooks|tags)"}
          component={NavSidewaysAuthContainer}
        />
      </div>
    );
  }
}

export default App;
