import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Switch, Route, Link } from "react-router-dom";
import usersService from "../lib/users-service";
//import tripsService from "../lib/trips-service";


import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import AnonRoute from "../components/AnonRoute";

import AddPic from "./AddPic";

class Private extends Component {

  state = { username: "" }

  componentDidMount = () => {
    usersService.profile()
      .then(({data}) => {
        //console.log(data)
      })
  }

  delProfile = () =>{
    usersService.deleteProfile()
    //.then(this.props.history.push("/home"))
  }


  render() {

    const { user, logout, isLoggedin } = this.props;

    return (
      <div>
        
        {
            isLoggedin ? 
            (<>
              <h1>Welcome {user.username}</h1>	
              <Link to={'/edit-profile'} id='home-btn'><p>Editar</p></Link>
              <AddPic />
              <button className="navbar-button" onClick={logout}>Logout</button>
              <button className="navbar-button" onClick={this.delProfile}>Eliminar</button>
              
              <Link to={'/new-trip'} id='home-btn'><p>Nueva aventura</p></Link>
            </>) 
          : 
            (<>
              <Switch>
                <AnonRoute exact path='/signup' component={Signup} />
                <AnonRoute exact path='/login' component={Login} />
              </Switch>
            </>)
        }
      </div>
    );
  }
}

export default withAuth(Private);