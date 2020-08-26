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
import Salir from '../images/cerrar-sesion.png'
import Eliminar from '../images/eliminar.png'

import './Private.css';


class Private extends Component {

  state = { username: "", 
            profilepic: "", 
            createdtrips: [], 
            favoritetrips: [],
            isShowing: false,
            isShow: false
          }

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

  showTrips = () => {
    if(!this.state.isShowing){
      this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }

  showFavouriteTrips = () => {
    if(!this.state.isShow){
      this.setState({isShow: true});
      } else {
        this.setState({isShow: false});
      }
  }

  render() {
 
    const { user, logout, isLoggedin } = this.props;
    //console.log(user)
    const CreatedTrips = () => {
      return (
        this.state.isShowing ? this.state.createdtrips.map(trip => <div key={trip._id}><Link to={`/trips/${trip._id}`}><p>{trip.name}</p></Link></div>) : null
      )
    }
    const FavouriteTrips = () => {
      return (
        this.state.isShow ? this.state.favoritetrips.map(trip => <div key={trip._id}><Link to={`/trips/${trip._id}`}><p>{trip.name}</p></Link></div>) : null
      )
    }
    
    return (
      <div>
        
        {
            isLoggedin ? 
            (<div className="profile-container">
              <div className="leftbox">
                <div className="profile-img">
                  <img src={user.profilepic} width="200" alt=""/>	
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
                <div>
                  <button className="icon-btn" onClick={logout}><img className="icono" src={Salir} alt=""/></button>
                  <button className="icon-btn" onClick={this.delProfile}><img className="icono" src={Eliminar} alt=""/></button>
                </div>
              </div>
              <div className="rigthbox">
              {/*<div>{this.renderEditForm()}</div>*/}
                <div className="adventures">
                  {this.state.createdtrips && this.state.createdtrips.length >0 &&  <button className="log-btn" onClick={(e) => this.showTrips()}>Mis aventuras</button>}
                  <CreatedTrips />
                </div>
                <div className="adventures">
                  {this.state.favoritetrips && this.state.favoritetrips.length >0 &&  <button className="log-btn" onClick={(e) => this.showFavouriteTrips()}>Favoritas</button>}
                  <FavouriteTrips />
                </div>
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