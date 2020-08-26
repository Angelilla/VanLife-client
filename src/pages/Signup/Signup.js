import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withAuth } from "../../lib/AuthProvider";

class Signup extends Component {
  state = { username: "", email: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    //console.log('Signup -> form submit', { username, email, password });
    this.props.signup({ username, email, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;
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
            <div className="log-title">Crea una cuenta</div>
            <div className="input-box">
              <input className="input-log" type="text" name="username" value={username} onChange={this.handleChange} placeholder="Nombre de usuario"/>
            </div>
            <div className="input-box">
              <input className="input-log" type="text" name="email" value={email} onChange={this.handleChange} placeholder="Email"/>
            </div>
            <div className="input-box">
              <input className="input-log" type="password" name="password" value={password} onChange={this.handleChange} placeholder="******" />
            </div>
            <button onClick={this.handleFormSubmit} className="log-btn" type="submit" value="Signup">Regístrate</button>
            <div className="border-box">
              <div className="line"/>
              <div className="text or">¿Ya tienes cuenta?</div>
            </div>
            <div className="sgnup"></div>
              <div className="sgnup-link">
              <Link className="btns-cont-link" to={"/login"}>Entra</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
