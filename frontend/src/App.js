import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NavAuthContainer from "./containers/NavAuthContainer.js";
import NotebooksContainer from "./containers/NotebooksContainer.js";
import TagsContainer from "./containers/TagsContainer.js";
import LandingPage from "./components/landing/LandingPage.js";
import LogInAuthContainer from "./containers/LogInAuthContainer.js";
import SignInAuthContainer from "./containers/SignInAuthContainer.js";
import PrivateRoute from "./utils/AuthRouting";

class App extends Component {
  componentDidMount() {
    this.props.checkAuthenticateStatus();
  }

  render() {
    console.log("APP PROPS!", this.props);

    return (
      <div className="App">
        <Route component= {NavAuthContainer} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LogInAuthContainer} />
          <Route path="/signup" component={SignInAuthContainer} />
          <PrivateRoute path="/notebooks" component={NotebooksContainer} />
          <PrivateRoute path="/tags" component={TagsContainer} />
        </Switch>
      </div>
    );
  }
}


export default App
