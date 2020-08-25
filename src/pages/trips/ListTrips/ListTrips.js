import React, { Component , useState, useEffect} from "react";
import { Link } from "react-router-dom";

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
          <div>
            <div>
                {     
                    allTrips ?   allTrips.map(trip => {
                        return(
                            <div key={trip._id}>
                               <Link to={`/trips/${trip._id}`}>{trip.name}</Link>
                            </div>
                   )}) : null 
                }
            </div>
          </div>
        );
      

}

export default ProjectList;