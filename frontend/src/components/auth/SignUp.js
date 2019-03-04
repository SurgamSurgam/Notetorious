import React from "react";
import axios from "axios";
import Auth from "../../utils/Auth";
import SignUpDisplay from "./SignUpDisplay.js";

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

    this.props.history.push('/notes')
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
    const { username, email, password } = this.state;
    const { isLoggedIn } = this.props;

    return (
      <div className="signUpDisplayWrapper">
        <SignUpDisplay
          username={username}
          email={email}
          password={password}
          isLoggedIn={isLoggedIn}
          registerUser={this.registerUser}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SignUp;
