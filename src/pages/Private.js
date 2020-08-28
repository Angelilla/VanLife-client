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

    this.setState(state => ( ({
      isShowing: !state.isShowing, 
      isShow:  false
    })))
    
  }

  showFavouriteTrips = () => {

    this.setState(state => ( ({
      isShow: !state.isShow, 
      isShowing: false
    })))
    
  }

  render() {
 
    const { user, logout, isLoggedin } = this.props;

    let btnClassName = 'logbtn';
    if (this.state.isShowing) {
      btnClassName = 'logbtn-active';
    }
    
    let btnClassNameFavs = 'logbtn';
    if (this.state.isShow) {
      btnClassNameFavs = 'logbtn-active';
    } 

    let wrappedGrid = 'wrappedgrid';
    if (this.state.isShowing) {
      wrappedGrid = 'wrappedgrid-active';
    }

    let favWrappedGrid = 'wrappedgrid';
    if (this.state.isShow) {
      favWrappedGrid = 'wrappedgrid-active';
    }
    

    const CreatedTrips = () => {
      return (
        <div className={wrappedGrid}>
          {this.state.isShowing ? this.state.createdtrips.map(trip => {
            return (
              <Link to={`/trips/${trip._id}`}>
              <div key={trip._id} className="thecontainer">
                <div className="thebanner">
                  <img className="thebanner-img"width="200" src={trip.gallery[0]} width="200" alt=""/>
                </div>
                <div className="thename">
                <p>{trip.name}</p>
              </div>
              </div>
              </Link>)}) : null
          }
        </div>
      )
    }
    const FavouriteTrips = () => {
      return (
        <div className={favWrappedGrid}>
          {this.state.isShow ? this.state.favoritetrips.map(trip => {
            return (
              <Link to={`/trips/${trip._id}`}>
              <div key={trip._id} className="thecontainer">
                <div className="thebanner">
                  <img className="thebanner-img" src={trip.gallery[0]}  alt=""/>
                </div>
              <div className="thename">
                <p>{trip.name}</p>
              </div>
              </div>
              </Link>)}) : null
          }
        </div>
      )
    }
    
    return (
      <div className="profile-container">
        
        {
            isLoggedin ? 
            (<div className="profile-container2">
              <div className="leftbox">
                <div className="profile-img">
                  <div className="profileimg">
                    <img src={user.profilepic} alt=""/>	
                  </div>
                </div>
                <div className="username">
                  <div className="name">
                    <p>{user.username}</p>
                    <p className="subtitulo">{user.createdtrips.length} aventuras creadas</p>
                  </div>
                  <div className="editbtndiv">
                    <div><Link className="editbtn" to={'/edit-profile'} >Editar</Link></div>
                  </div>
                <div className="final"></div>
                </div>
              </div>
                <div className="opciones">
                  <div className="camara">
                    <Link to={'/addpic'} id='home-btn'><img className="icono" src={Camara} alt=""/></Link>
                  </div>
                  <div className="caravana">
                    <Link to={'/new-trip'} id='home-btn'><img className="icono" src={Caravana} alt=""/></Link>
                  </div>
                  <div className="salir">
                    <button className="iconbtn" onClick={logout}><img className="icono" src={Salir} alt=""/></button>
                  </div>
                  <div className="borrar">
                    <button className="iconbtn" onClick={this.delProfile}><img className="icono" src={Eliminar} alt=""/></button>
                </div>
                  </div>

              <div className="rigthbox">
                <div className="pestañas2">
                  <div className="creat-adventures">
                    {this.state.createdtrips && this.state.createdtrips.length >0 &&  <button className={btnClassName} onClick={(e) => this.showTrips()}>Mis aventuras</button>}
                  </div>
                  <div className="fav-adventures">
                    {this.state.favoritetrips && this.state.favoritetrips.length >0 &&  <button className={btnClassNameFavs} onClick={(e) => this.showFavouriteTrips()}>Favoritas</button>}
                  </div>
                  <div className="favadventures">
                     <Link to={'/new-trip'} className="linkbtn" >Crear</Link>
                  </div>
                </div>
                <div className="show-trips">
                  <CreatedTrips />
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