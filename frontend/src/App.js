import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar.js";
import NotebooksContainer from "./containers/NotebooksContainer.js";
import LandingPage from "./components/landing/LandingPage.js";
import SignUp from "./components/auth/SignUp.js";
import LogIn from "./components/auth/LogIn.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/notebooks" component={NotebooksContainer} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
