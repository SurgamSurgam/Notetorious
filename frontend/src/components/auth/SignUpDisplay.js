import React from "react";
import { withRouter } from "react-router";

const SignUpDisplay = ({
  username,
  email,
  password,
  registerUser,
  handleChange
}) => {
  return (
    <React.Fragment>
      {/*<h1>Sign Up Page</h1>*/}
      <form onSubmit={registerUser}>
        <input
          className="signUpUsernameInput"
          type="text"
          value={username}
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          className="signUpEmailInput"
          type="text"
          value={email}
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="signUpPasswordInput"
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="signUpSubmitButton" type="submit">
          Continue
        </button>
      </form>
    </React.Fragment>
  );
};

export default withRouter(SignUpDisplay);
