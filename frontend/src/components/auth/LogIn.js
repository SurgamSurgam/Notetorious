import React from "react";
import axios from "axios";
import Auth from "../../utils/Auth";
import LoginDisplay from "./LoginDisplay.js";

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
      });
  };
  // handleOnSubmit = async e => {
  //   e.preventDefault();
  //   // await this.props.addUser(this.state.newUser);
  //   this.setState({
  //     username: "",
  //     password: ""
  //   });
  //   // this.props.history.push(`/users`);
  // };

  render() {
    console.log("LOGIN PROPS!!", this.props);
    const { username, password } = this.state;
    const { isLoggedIn } = this.props;

    return (
      <div className="logInDisplayWrapper">
        <LoginDisplay
          username={username}
          password={password}
          isLoggedIn={isLoggedIn}
          loginUser={this.loginUser}
          handleChange={this.handleChange}
          demoLogin={this.demoLogin}
        />
      </div>
    );
  }
}

export default LogIn;
