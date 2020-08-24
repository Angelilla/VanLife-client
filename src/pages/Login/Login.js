import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";

import './Login.css';

class Login extends Component {
  state = { email: "", password: "" };

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
        <div className="left-box">
            <div className="bg-orange"></div>
            <div className="log-img"></div>
            <div className="img-text bold style1">VanLife</div>
            <div className="img-text style2">Porque la vida es una aventura.</div>
        </div>
        <div className="right-box">
          <div className="box">
            <div className="log-title">¡Bienvenido!</div>
            <div className="input-box">
              <input className="input-log" type="text" name="email" value={email} onChange={this.handleChange} placeholder="Tu email"/>
            </div>
            <div className="input-box">
              <input className="input-log" type="password" name="password" value={password} onChange={this.handleChange} placeholder="******" />
            </div>
            <button onClick={this.handleFormSubmit} className="log-btn" type="submit" value="Login">Entra</button>
            <div className="border-box">
              <div className="line"/>
              <div className="text or">O crea una cuenta</div>
            </div>
            <div className="sgnup"></div>
            <div className="sgnup-link">
              <Link className="btns-cont-link" to={"/signup"}>Regístrate</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
