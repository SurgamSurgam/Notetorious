import React from "react";

class SignUp extends React.Component {
  state = {
    email: "",
    password: ""
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = async e => {
    e.preventDefault();
    // await this.props.addUser(this.state.newUser);
    this.setState({
      email: '',
      password: ''
    });
    // this.props.history.push(`/users`);
  };


  render () {
    console.log(this.state);
    let { email, password } = this.state;

    return (
      <div className="formDiv">
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleOnChange}
            required
          />
          <br />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleOnChange}
            required
          />
          <br />
          <button className='registerUserButton'>Continue</button>
        </form>
      </div>
    );
  };
}

export default SignUp;
