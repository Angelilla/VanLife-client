import React, { Component , useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./ListTrips.css"

import axios from 'axios';


const ProjectList = () => {

    const [allTrips, setAllTrips] = useState();

    const getAllTrips = async () => {
        
        await axios.get(`${process.env.REACT_APP_API_URI}/trips`)
        .then(data => setAllTrips(data.data) )

    }
    
    useEffect(() => {
      
        getAllTrips()
    }, []);
    
        return (
            
          <div className="wrapped-grid">
            {     
                allTrips ?   allTrips.map(trip => {
                    return(
                        <div className="container" key={trip._id}>
                            <Link to={`/trips/${trip._id}`}>
                            <div className="banner">
                                <img className="banner-img" src={trip.gallery[0]} width="200" alt=""/>
                            </div>
                            <div className="the-name">
                                <p>{trip.name}</p>
                            </div>
                            </Link>
                        </div>
                    )}) : null 
            }
          </div>
        );
      

}

export default ProjectList;