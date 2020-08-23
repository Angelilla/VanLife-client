import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import styled from 'styled-components'

import './Navbar.css';
//import RightNav from "./RigthtNav";
import Burger from "./Burger";

const Nav = styled.nav`

  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: #cb9b42;
  display: flex;
  justify-content: space-between;
  width: 100%;
  heigth: 55px;
  padding: 0 10px;
  background: #b1d1c5; 

  .logo {
    padding: 15px 0;
    font-size: 20px;
    margin-left: 10px;
  }

  @media (max-width: 768px){
    width: 95%;
  }

`;

class Navbar extends Component {
  render() {

    return (
      <Nav>
            <div className="logo">
              <Link to={'/'} id='home-btn'><p>Home</p></Link>
            </div>
            <Burger />
            
      </Nav>
    );
  }
}

export default withAuth(Navbar);