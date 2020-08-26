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
              <div className="log-cont">
                <div className="left-box">
                  <div className="bg-orange"></div>
                  <div className="img-text bold style1">VanLife</div>
                  <div className="img-text style2">Porque la vida es una aventura.</div>
                </div>
                <div className="right-box">
                  <div className="box">
                    <div className="log-title">Comienza tu aventura</div>
                    <div className="sgnup-link">
                      <Link className="btns-cont-link"to="/trips">Aventuras</Link>
                    </div>
                    <div className="border-box">
                      <div className="line"/>
                      <div className="text or">¿Ya tienes cuenta?</div>
                    </div>
                    <div className="sgnup"></div>
                      <div className="sgnup-link">
                      <Link className="btns-cont-link" to={"/login"}>Entra</Link>
                    </div>
                    <div className="border-box">
                      <div className="line"/>
                      <div className="text or">O crea una cuenta</div>
                    </div>
                    <div className="sgnup">
                      <div className="sgnup-link">
                        <Link className="btns-cont-link" to={"/signup"}>Regístrate</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               
            </>)
        }
      
      </div>
    )
  }
}

export default withAuth(Home);