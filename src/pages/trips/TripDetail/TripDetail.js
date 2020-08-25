import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class TripDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
      }
    
  
    componentDidMount() {
      this.getTrip();
    }
  
    getTrip = () => {
      
      const { params } = this.props.match;
      console.log("hola")
      axios
        .get(`${process.env.REACT_APP_API_URI}/trips/${params.id}`)
        .then(response => {
          const theTrip = response.data;
          console.log(theTrip);
          this.setState(theTrip);
        })
        .catch(err => {
          console.log(err);
        });
    };
  
    render() {
      return (
        <div>
          <h1>{this.state.name}</h1>
          <p>{this.state.traveler}</p>
          <Link to={"/"}>Aventuras</Link>
        </div>
      );
    }
}
 

export default TripDetail;