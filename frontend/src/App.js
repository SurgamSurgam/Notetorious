import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar.js";
import NotebooksContainer from "./containers/NotebooksContainer.js";
import LandingPage from "./components/landing/LandingPage.js";
import SignUp from "./components/auth/SignUp.js";
import LogIn from "./components/auth/LogIn.js";
import axios from "axios";
import Auth from "./utils/Auth";
import PrivateRoute from "./utils/AuthRouting";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: ""
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.checkAuthenticateStatus();
  }

  checkAuthenticateStatus = () => {
    axios.get("/sessions/isLoggedIn").then(user => {
      if (user.data.username === Auth.getToken()) {
        this.setState({
          isLoggedIn: Auth.isUserAuthenticated(),
          user: Auth.getToken()
        });
      } else {
        if (user.data.username) {
          this.logoutUser();
        } else {
          Auth.deauthenticateUser();
        }
      }
    });
  };

  logoutUser = () => {
    axios
      .post("/sessions/logout")
      .then(() => {
        Auth.deauthenticateUser();
      })
      .then(() => {
        this.checkAuthenticateStatus();
      });
  };

  render() {
    const { isLoggedIn, user } = this.state;

    let logoutButton = isLoggedIn ? (
      <span>
        <button onClick={this.logoutUser}>Sign out {user}</button>
      </span>
    ) : null;

    return (
      <div className="App">
        <Navbar
          user={user}
          logoutButton={logoutButton}
          isLoggedIn={isLoggedIn}
        />
        <Switch>
          <Route
            path="/login"
            render={() => (
              <LogIn
                checkAuthenticateStatus={this.checkAuthenticateStatus}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          <Route
            path="/signup"
            render={() => (
              <SignUp
                checkAuthenticateStatus={this.checkAuthenticateStatus}
                isLoggedIn={isLoggedIn}
              />
            )}
          />
          <Route exact path="/" component={LandingPage} />
          {/*<Route exact path="/notebooks" component={NotebooksContainer} />*/}
          <PrivateRoute path="/notebooks" component={NotebooksContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
