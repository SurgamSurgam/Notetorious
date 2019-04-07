import React from "react";
import axios from "axios";
import Auth from "../../utils/Auth";
import LoginDisplay from "./LoginDisplay.js";
import "./Login.css";
import { Link } from "react-router-dom";

class LogIn extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  loginUser = e => {
    e.preventDefault();
    const { username, password } = this.state;

    axios
      .post("/sessions/login", { username, password })
      .then(() => {
        Auth.authenticateUser(username);
      })
      .then(() => {
        this.props.checkAuthenticateStatus();
      })
      .then(() => {
        this.setState({
          username: "",
          password: ""
        });
      });
  };

  demoLogin = e => {
    e.preventDefault();
    axios
      .post("/sessions/login", { username: "demo", password: "demo123" })
      .then(() => {
        Auth.authenticateUser("demo");
      })
      .then(() => {
        this.props.checkAuthenticateStatus();
      })
      .then(() => {
        this.setState({
          username: "",
          password: ""
        });
      })
      .then(() => {
        this.props.history.push("/notes");
      });
  };

  render() {
    const { username, password } = this.state;
    const { isLoggedIn } = this.props;

    return (
      <div className="loginMain">
        <div className="logInDisplayWrapper">
          <div className="heading">
            <span className="logoNameSpanInLogin">
              <i className="fas fa-book-dead" />
              <span className="logoTitleSpan">Notetorious</span>
            </span>
            <p className="tagline">Remember everything important.</p>
          </div>
          <ol>
            <li className="Row">
              <div className="oauthGoogle">
                <img
                  src="https://www.evernote.com/redesign/OpenID/img/GGL_logo_googleg_18.png"
                  alt=""
                />
                <div className="oauthGoogleText">Continue with Google</div>
              </div>
            </li>
            <li className="Row horizontalRow">
              <div className="horizontalLine" />
            </li>
            <LoginDisplay
              username={username}
              password={password}
              isLoggedIn={isLoggedIn}
              loginUser={this.loginUser}
              handleChange={this.handleChange}
              demoLogin={this.demoLogin}
            />
            <li className="rememberMeCheckbox">
              <input type="checkbox" />
              Remember me for 30 days
            </li>
          </ol>
          <div className="redirectToSignUpFromLogIn">
            <p>Don't have an account?</p>
            <h1 className="linkToLogIn">
              <Link to="/signup">Create account</Link>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
