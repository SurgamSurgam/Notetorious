import React from "react";
import { withRouter } from "react-router";

const LoginDisplay = ({
  username,
  password,
  isLoggedIn,
  loginUser,
  handleChange,
  demoLogin
}) => {
  return (
    <React.Fragment>
      <form onSubmit={loginUser}>
        <input
          className="loginUsernameInput"
          type="text"
          value={username}
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          className="loginPasswordInput"
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="loginSubmitButton" type="submit">
          Continue
        </button>
        <button className="demoButton" onClick={demoLogin}>
          Demo log in
        </button>
      </form>

      <p>{isLoggedIn ? "Logged In!" : ""}</p>
    </React.Fragment>
  );
};

export default withRouter(LoginDisplay);
