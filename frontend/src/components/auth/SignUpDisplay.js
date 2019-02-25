import React from "react";
import { withRouter } from "react-router";

const SignUpDisplay = ({ username, email, password, registerUser, handleChange }) => {
  return (
    <React.Fragment>
      <h1>Sign Up Page</h1>
      <form onSubmit={registerUser}>
        <input
          type="text"
          value={username}
          name="username"
          placeholder="username"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          value={email}
          name="email"
          placeholder="email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          value={password}
          name="password"
          placeholder="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Continue</button>
      </form>
    </React.Fragment>
  );
};

export default withRouter(SignUpDisplay);
