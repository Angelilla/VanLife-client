import React, { Component } from "react";
import "./App.css";
import { Switch, Link } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from './pages/Home'
import Signup from "./pages/Signup";
import Login from "./pages/Login";
//import Private from "./pages/Private";

import AnonRoute from "./components/AnonRoute";
//import PrivateRoute from "./components/PrivateRoute";

import AuthProvider from "./lib/AuthProvider";

class App extends Component {
  render() {
    return (
      <AuthProvider> 
        <Navbar />
        <div className='container'>
        <Link to={"/login"}> Login</Link>
        <Link to={"/signup"}> Signup</Link>
          <Switch>
                <AnonRoute exact path='/signup' component={Signup} />
                <AnonRoute exact path='/login' component={Login} />
          </Switch>
          <Home />
        </div>
      </AuthProvider> 
    );
  }
}

export default App;
