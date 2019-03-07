import React from "react";
import axios from "axios";
import Auth from "../../utils/Auth";
import SignUpDisplay from "./SignUpDisplay.js";
import "./SignUp.css";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  registerUser = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;

    await axios.post("/api/users/", { username, email, password });
    Auth.authenticateUser(username);
    await axios.post("/sessions/login", { username, password });
    await this.props.checkAuthenticateStatus();

    this.setState({
      username: "",
      email: "",
      password: ""
    });

    this.props.history.push("/notes");
  };

  render() {
    const { username, email, password } = this.state;
    const { isLoggedIn } = this.props;

    return (
      <div className="signUpMain">
        <div className="signUpDisplayWrapper">
          <div className="heading">
            <span className="logoNameSpan">
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
            <SignUpDisplay
              username={username}
              email={email}
              password={password}
              isLoggedIn={isLoggedIn}
              registerUser={this.registerUser}
              handleChange={this.handleChange}
            />
            <li className="tos">
              By creating an account, you are agreeing to our
              <span>Terms of Service</span> and <span>Privacy Policy</span>
            </li>
          </ol>
          <div className="redirectToLoginFromSignUp">
            <p>Already have an account?</p>
            <h1 className="linkToSignIn">
              <Link to="/login">Sign in</Link>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
