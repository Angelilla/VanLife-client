import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link  } from "react-router-dom";
import './Home.css';

import ListTrips from "../trips/ListTrips/ListTrips"
import TripDetail from "../trips/TripDetail/TripDetail";

class Home extends Component {
  
  render() {

    const { user, logout, isLoggedin } = this.props;
    return (
      <div className="home-cont">
         
        
        <Link to="/trips">Aventuras</Link>
        
        

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