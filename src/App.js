import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from './pages/Home/Home'
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import CreateTrip from "./pages/trips/CreateTrip/CreateTrip";
import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import EditProfile from "./pages/EditProfile/EditProfile";
import Private from './pages/Private';

class App extends Component {
  render() {
    return (
      <AuthProvider> 
        <Navbar />
        <div className='app-container'>
          <Switch>
                <AnonRoute exact path='/signup' component={Signup} />
                <AnonRoute exact path='/login' component={Login} />
                <PrivateRoute exact path='/private' component={Private} />
                <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                <PrivateRoute exact path='/new-trip' component={CreateTrip} />
                <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </AuthProvider> 
    );
  }
}

export default App;
