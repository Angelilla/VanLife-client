import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";

import './Login.css';

import Title from './components/Title/Title';
import Label from './components/Label/Label';
import Input from './components/Input/Input';

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="log-cont">
        <Title text="Login" />

        <form onSubmit={this.handleFormSubmit}>
          
          <Label text="Email:" />
          <input type="text" name="email" value={email} onChange={this.handleChange}/>

          <Label text="Contraseña:" />
          <input type="password" name="password" value={password} onChange={this.handleChange} />

          <input type="submit" value="Login" />
        </form>
        <Link to={"/signup"}> Signup</Link>
      </div>
    );
  }
}

export default withAuth(Login);
