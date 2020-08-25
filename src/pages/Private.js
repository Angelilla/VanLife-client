import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Switch, Link } from "react-router-dom";
import usersService from "../lib/users-service";
//import tripsService from "../lib/trips-service";


import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import AnonRoute from "../components/AnonRoute";

import AddPic from "./AddPic";

class Private extends Component {

  state = { username: "", profilepic: "", createdtrips: [] }

  componentDidMount = () => {
    usersService.profile()
    .then(usuario => {
      //console.log(data)
      this.setState({
        createdtrips: usuario.createdtrips
        
      })
      //console.log(usuario.createdtrips[0])
      //data.createdtrips.map(trip => trip._id
      //console.log(usuario.createdtrips.map(trip => trip._id))

    })
      
  }

  delProfile = () =>{
    usersService.deleteProfile()
    .then(this.props.history.push("/"))
  }

  getTrips = () => {
    usersService.profile()
    .then(data => {
      this.setState({
        createdtrips : data.createdtrips
      })
      .then(console.log(data.data))
      //console.log(data)
      //data.createdtrips.map(trip => trip._id
      //console.log(data.createdtrips.map(trip => trip._id)
    })
  }


  render() {
 
    const { user, logout, isLoggedin } = this.props;

    //const { createdtrips } = usersService.profile();
    console.log(user)

    return (
      <div>
        
        {
            isLoggedin ? 
            (<div className="profile-container">
              
              <h1>Welcome {user.username}</h1>
              <img src={user.profilepic} alt="image"/>	
              <Link to={'/edit-profile'} id='home-btn'><p>Editar</p></Link>
              <AddPic />
              <h3>Mis aventuras</h3>
              

              {this.state.createdtrips.map(trip => {
                return (
                  <div key={trip._id}>
                  <p>{trip.name}</p>
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