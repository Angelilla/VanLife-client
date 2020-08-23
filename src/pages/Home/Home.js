import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Switch } from "react-router-dom";
import './Home.css';

import Private from "../Private";

import PrivateRoute from "../../components/PrivateRoute";
import AddPic from "../AddPic";

class Home extends Component {
  
  render() {

    const { user, logout, isLoggedin } = this.props;
    return (
      <div className="home-cont"> 
        <h1>Home Page</h1>
        {
            isLoggedin ? 
            (<>
              <p className="navbar-user">username: {user.username}</p>	
              <AddPic />
              <button className="navbar-button" onClick={logout}>Logout</button>	
            </>) 
          : 
            (<>
              <Switch>
                <PrivateRoute exact path='/private' component={Private} />
              </Switch>
            </>)
        }
      </div>
    )
  }
}

export default withAuth(Home);