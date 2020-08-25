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
          console.log(theTrip._id, this.props.user._id);
          this.setState({theTrip: theTrip});
        })
        .catch(err => {
          console.log(err);
        });
    };

    addFav = ()=> {
      const tripId = this.state.theTrip._id;
      const userId = this.props.user._id;
      //console.log(this.state.theTrip)
      tripsService.addFavouriteTrip(tripId, userId)

          .then(() => this.props.history.push("/private"), 1000)

      //console.log(theTrip._id)
      //.then(() => this.props.history.push("/private"), 1000)
  }
  
    render() {
      return (
        <div>
          <h1>{this.state.name}</h1>
          <p>{this.state.traveler.username}</p>
          <Link to={"/trips"}>Aventuras</Link>
          <button className="log-btn" onClick={this.addFav}>Añadir a favoritos</button>
          <Link to={`/trips/${this.state._id}/edit`}>Editar</Link>
        </div>
      );
    }
}
 

export default withAuth(TripDetail);