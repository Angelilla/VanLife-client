import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../../../lib/AuthProvider";
import tripsService from '../../../lib/trips-service'

import Camara from '../../../images/camara.png'
import Eliminar from '../../../images/eliminar.png'

import { Link } from "react-router-dom";

class TripDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          traveler: "",
          followers: [],
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
          //console.log(theTrip.traveler.username);
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
          <div>
            <div className="icon-div">
              <Link to={`/api/addpicgallery/${this.state.theTrip._id}`} id='home-btn'><img className="icono" src={Camara} alt=""/></Link>
            </div>
            <Link to={`/trips/${this.state.theTrip._id}/edit`}>Editar</Link>
            <button className="log-btn" onClick={this.delTrip}>Eliminar</button>
          </div>
        )

     } else {
      return  null
     }
    }
    
    render() {
      
      const CreatorOptions = () => {
       return  this.props.user ? this.DynamicText() : null
      }
     
      return (
        <div>
          <h1>{this.state.theTrip.name}</h1>
          {this.state.theTrip.traveler ? (<p>{this.state.theTrip.traveler.username}</p>)
           : null 
          }
          <Link to={"/trips"}>Aventuras</Link>
          <CreatorOptions />
          <button className="log-btn" onClick={this.addFav}>Añadir a favoritos</button>
          <button className="log-btn" onClick={this.delFav}>Eliminar de favoritos</button>
        </div>
      );
    }
}
 

export default withAuth(TripDetail);