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
          //console.log(theTrip.gallery);
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
            <div className="icon-div">
              <Link to={`/trips/${this.state.theTrip._id}/edit`}><img className="icono" src={Editar} alt=""/></Link>
            </div>
            <button className="icon-btn" onClick={this.delTrip}><img className="icono" src={Eliminar} alt=""/></button>
            
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
        <div>
          <h1>{this.state.theTrip.name}</h1>
          {this.state.theTrip.traveler ? (<p>{this.state.theTrip.traveler.username}</p>)
           : null 
          }
          {this.state.theTrip.gallery && photoGallery.map((pic, index) => <div key={index}><img src={pic} width="330" alt=""/></div>)}
          <Link to={"/trips"}>Aventuras</Link>
          <CreatorOptions />
          
          {
            isLoggedin ? (
              <>
                <button className="icon-btn" onClick={this.addFav}><img className="icono" src={AddFav} alt=""/></button>
                <button className="icon-btn" onClick={this.delFav}><img className="icono" src={DelFav} alt=""/></button>
              </>
            ) : (
              null
            )
          }
        </div>
      );
    }
}
 

export default withAuth(TripDetail);