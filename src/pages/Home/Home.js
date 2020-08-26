import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link  } from "react-router-dom";
import './Home.css';
import ListTrips from "../../pages/trips/ListTrips/ListTrips"

class Home extends Component {
  
  render() {

    const { isLoggedin } = this.props;
    return (
      <div className="home-cont">
        {
            isLoggedin ? 
            (<>
             <ListTrips />
            </>) 
          : 
            (<>
               <Link to="/trips">Aventuras</Link>
            </>)
        }
      
      </div>
    )
  }
}

export default withAuth(Home);