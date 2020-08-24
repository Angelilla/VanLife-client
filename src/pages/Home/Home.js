import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Switch } from "react-router-dom";
import './Home.css';

import ListTrips from "../trips/ListTrips/ListTrips"
//import Private from "../Private";
//import Signup from "../Signup/Signup";
//import Login from "../Login/Login";
//import AnonRoute from "../../components/AnonRoute";

//import PrivateRoute from "../../components/PrivateRoute";
//import AddPic from "../AddPic";

class Home extends Component {
  
  render() {

    const { user, logout, isLoggedin } = this.props;
    return (
      <div className="home-cont">
         
        <ListTrips /> 
      {/*
        {
            isLoggedin ? 
            (<>
              <PrivateRoute exact path='/private' component={Private} />
              <p className="navbar-user">username: {user.username}</p>	
              <AddPic />
              <button className="navbar-button" onClick={logout}>Logout</button>	
            </>) 
          : 
            (<>
              <Switch>
                <AnonRoute exact path='/signup' component={Signup} />
                <AnonRoute exact path='/login' component={Login} />
              </Switch>
            </>)
        }
      */}
      </div>
    )
  }
}

export default withAuth(Home);