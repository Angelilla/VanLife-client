import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Switch, Link } from "react-router-dom";
import usersService from "../lib/users-service";
//import tripsService from "../lib/trips-service";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import AnonRoute from "../components/AnonRoute";

import Lapiz from '../images/lapiz.png'
import Caravana from '../images/caravana.png'
import Camara from '../images/camara.png'

import './Private.css';

import AddPic from "./AddPic";


class Private extends Component {

  state = { username: "", 
            profilepic: "", 
            createdtrips: [], 
            favoritetrips: [] }

  componentDidMount = () => {
    usersService.profile()
    .then(usuario => {
      //console.log(usuario.createdtrips)
      this.setState({
        createdtrips: usuario.createdtrips, 
        favoritetrips: usuario.favoritetrips
        
      })
    })
      
  }

  delProfile = () =>{
    usersService.deleteProfile()
    .then(this.props.history.push("/"))
  }
  /*
  toggleForm = () => {
    if(!this.state.isShowing){
        this.setState({isShowing: true});
    } else {
      this.setState({isShowing: false});
    }
  }

  showTrips = () => {
    if(this.state.isShowing){
      return (
        {this.state.createdtrips.map(trip => {
          return (
            <div key={trip._id}>
              <Link to={`/trips/${trip._id}`}><p>{trip.name}</p></Link>
            </div>
          )
        })
          
        }
      )
    }
    /*this.state.createdtrips.map(trip => {
      return (
        <div key={trip._id}>
          <Link to={`/trips/${trip._id}`}><p>{trip.name}</p></Link>
        </div>
      )
    })
  }*/

  render() {
 
    const { user, logout, isLoggedin } = this.props;
    //console.log(user)

    return (
      <div>
        
        {
            isLoggedin ? 
            (<div className="profile-container">
              <div className="leftbox">
                <div className="profile-img">
                  <img src={user.profilepic} width="200" alt="img"/>	
                </div>
                <div className="username">
                  <h3>{user.username}</h3>
                </div>
                <div className="profile-links">
                    <div className="icon-div">
                      <Link to={'/edit-profile'} id='home-btn'><img className="icono" src={Lapiz} alt=""/></Link>
                    </div>
                    <div className="icon-div">
                      <Link to={'/new-trip'} id='home-btn'><img className="icono" src={Caravana} alt=""/></Link>
                    </div>
                    <div className="icon-div">
                      <Link to={'/addpic'} id='home-btn'><img className="icono" src={Camara} alt=""/></Link>
                    </div>
                </div>
              </div>
              <div className="rigthbox">
              {/*<div>{this.renderEditForm()}</div>*/}
                <div className="adventures">
                  {this.state.createdtrips && this.state.createdtrips.length >0 &&  <h3>Mis aventuras</h3>}
                  {this.state.createdtrips.map(trip => {
                    return (
                      <div key={trip._id}>
                        <Link to={`/trips/${trip._id}`}><p>{trip.name}</p></Link>
                      </div>
                    )
                  })}

                  {/*{<button className="log-btn" onClick={this.showTrips()}><h3>Mis aventuras</h3></button>}*/}
                </div>

                <div className="adventures">
                  {this.state.favoritetrips && this.state.favoritetrips.length >0 &&  <h3>Mis aventuras favoritas</h3>}
                  {this.state.favoritetrips.map(trip => {
                    return (
                      <div key={trip._id}>
                        <Link to={`/trips/${trip._id}`}><p>{trip.name}</p></Link>
                      </div>
                    )
                  })}
                </div>
                </div>
              <div>
                <button className="log-btn" onClick={logout}>Logout</button>
                <button className="log-btn" onClick={this.delProfile}>Eliminar</button>
              </div>
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