import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Switch, Link } from "react-router-dom";
import usersService from "../lib/users-service";
//import tripsService from "../lib/trips-service";


import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import AnonRoute from "../components/AnonRoute";

import AddPic from "./AddPic";
import EditProfile from "./EditProfile/EditProfile";

class Private extends Component {

  state = { username: "", profilepic: "", createdtrips: [] }

  componentDidMount = () => {
    usersService.profile()
    .then(usuario => {
      //console.log(data)
      this.setState({
        createdtrips: usuario.createdtrips
      })
    })
      
  }

  delProfile = () =>{
    usersService.deleteProfile()
    .then(this.props.history.push("/"))
  }

  /*
  renderEditForm = () => {
    if (!this.state.name){
      usersService.profile()
    } else {
      return <EditProfile {...this.props} />

    }
  }
  */

  render() {
 
    const { user, logout, isLoggedin } = this.props;
    //console.log(user)

    return (
      <div>
        
        {
            isLoggedin ? 
            (<div className="profile-container">
              
              <h1>Welcome {user.username}</h1>
              <img src={user.profilepic} alt="img"/>	
              <Link to={'/edit-profile'} id='home-btn'><p>Editar</p></Link>
              {/*<div>{this.renderEditForm()}</div>*/}
              <AddPic />
              <h3>Mis aventuras</h3>
              {this.state.createdtrips.map(trip => {
                return (
                  <div key={trip._id}>
                  <Link to={`/trips/${trip._id}`}><p>{trip.name}</p></Link>
                  </div>
                )
              })}
              
              
             
                

              <button className="log-btn" onClick={logout}>Logout</button>
              <button className="log-btn" onClick={this.delProfile}>Eliminar</button>
              
              <Link to={'/new-trip'} id='home-btn'><p>Nueva aventura</p></Link>
            </div>) 
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