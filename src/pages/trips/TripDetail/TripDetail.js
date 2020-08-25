import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../../../lib/AuthProvider";
import tripsService from '../../../lib/trips-service'

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
      console.log(this.state.theTrip.traveler)
      tripsService.addFavouriteTrip(tripId, userId)

          .then(() => this.props.history.push("/private"))

      //console.log(theTrip._id)
      //.then(() => this.props.history.push("/private"), 1000)
    }

    delFav = ()=> {
      const tripId = this.state.theTrip._id;
      const userId = this.props.user._id;
      //console.log(this.state.theTrip)
      tripsService.deleteFavouriteTrip(tripId, userId)

          .then(() => this.props.history.push("/private"))
    }


  
    render() {
      console.log(this.state.theTrip)
      return (
        <div>
          <h1>{this.state.theTrip.name}</h1>
          {this.state.theTrip.traveler ? (<p>{this.state.theTrip.traveler.username}</p>)
           : null 
          }
          <Link to={"/trips"}>Aventuras</Link>
          <button className="log-btn" onClick={this.addFav}>Añadir a favoritos</button>
          <button className="log-btn" onClick={this.delFav}>Eliminar de favoritos</button>
          {/*{this.state.theTrip.traveler === this.props.user ? (<Link to={`/trips/${this.state._id}/edit`}>Editar</Link>) : null }*/}
          <Link to={`/trips/${this.state._id}/edit`}>Editar</Link>
        </div>
      );
    }
}
 

export default withAuth(TripDetail);