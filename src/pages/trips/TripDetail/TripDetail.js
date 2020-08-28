import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../../../lib/AuthProvider";
import tripsService from '../../../lib/trips-service'
import './TripDetail.css';

import Camara from '../../../images/camara.png'
import Eliminar from '../../../images/eliminar.png'
import AddFav from '../../../images/favorito.png'
import DelFav from '../../../images/quitarfavorito.png'
import Editar from '../../../images/lapiz.png'
import Corazon from '../../../images/corazon -negro.png'
import FlechaIzq from '../../../images/flecha-izquierda.png'

import { Link } from "react-router-dom";

class TripDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          traveler: "",
          followers: [],
          gallery: [],
          theTrip: {}
        };
    }
    
  
    componentDidMount() {
      this.getTrip();
    }
  
    getTrip = () => {
      
      const { params } = this.props.match;
      axios
        .get(`${process.env.REACT_APP_API_URI}/trips/${params.id}`)
        .then(response => {
          const theTrip = response.data;
          console.log(theTrip.traveler);
          this.setState({theTrip: theTrip});
        })
        .catch(err => {
          console.log(err);
        });
    };

    addFav = ()=> {
      const tripId = this.state.theTrip._id;
      const userId = this.props.user._id;
      
      tripsService.addFavouriteTrip(tripId, userId)
          .then(() => this.props.history.push("/private"))
    }

    delFav = ()=> {
      const tripId = this.state.theTrip._id;
      const userId = this.props.user._id;
   
      tripsService.deleteFavouriteTrip(tripId, userId)
          .then(() => this.props.history.push("/private"))
    }

    delTrip = () => {
      const tripId = this.state.theTrip._id;
      
      tripsService.deleteTrip(tripId)
      .then(() => this.props.history.push("/private"))

    }
    
    DynamicText = () => {
      if( this.props.user.createdtrips.includes(this.state.theTrip._id)){
        return (
          <div className="creator-options-btns">
            <div className="iconbtn1">
              <Link to={`/api/addpicgallery/${this.state.theTrip._id}`}><img className="icon" src={Camara} alt=""/></Link>
            </div>
            <div className="iconbtn2">
              <Link to={`/trips/${this.state.theTrip._id}/edit`}><img className="icon" src={Editar} alt=""/></Link>
            </div>
            <div className="iconbtn3">
              <button  className="iconbtn3" onClick={this.delTrip}><img className="icon" src={Eliminar} alt=""/></button>
            </div>
            
          </div>
        )

     } else {
      return  null
     }
    }
    
    render() {

      const { isLoggedin } = this.props;
      
      const CreatorOptions = () => {
       return  this.props.user ? this.DynamicText() : null
      }

      const photoGallery =  this.state.theTrip.gallery;
     
      return (
        <div className="trip-container">
          <div className="name-propertys">
            <p>{this.state.theTrip.name}</p>
            {
              isLoggedin ? (
                <>
                  <button className="iconbtn" onClick={this.addFav}><img className="icon" src={AddFav} alt=""/></button>
                  <button className="iconbtn" onClick={this.delFav}><img className="icon" src={DelFav} alt=""/></button>
                 
                  
                </>
              ) : (
                  null
                  )
            }
          </div>
          <div className="traveler">
            <div className="creator-options">
              <div className="creator-options-data">
              {this.state.theTrip.traveler ? (<p>Viajero: {this.state.theTrip.traveler.username}</p>)
               : null 
              }
              {this.state.theTrip.traveler ? (<p>{this.state.theTrip.followers.length} <img className="icono-megusta" src={Corazon} alt=""/></p>)
               : null 
              }
              </div>
              
                <CreatorOptions />
             
             
            </div>
            <div className="traveler-pic">
              { this.state.theTrip.traveler ?  (<img src={this.state.theTrip.traveler.profilepic} className="traveler-pic-img" alt=""/>)
              : null 
              }
            </div>
          </div>
          <p className="galeria">Galería</p>
          <div className="wrapped-photo">
            {this.state.theTrip.gallery && photoGallery.map((pic, index) => <div className="container-photo" key={index}><img className="foto" src={pic} width="330" alt=""/></div>)}
          </div>
          <div className="flecha">
            <Link to={"/trips"}><img className="icon" src={FlechaIzq} alt=""/></Link>
          </div> 
          
        </div>
      );
    }
}
 

export default withAuth(TripDetail);