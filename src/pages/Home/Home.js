import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link  } from "react-router-dom";
import './Home.css';

class Home extends Component {
  
  render() {

    const { user, logout, isLoggedin } = this.props;
    return (
      <div className="home-cont">
        {
            isLoggedin ? 
            (<>
             <Link to="/trips">Aventuras</Link>
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