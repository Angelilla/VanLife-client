import React from 'react';
import { Link } from "react-router-dom";

import styled from 'styled-components'

const Ul = styled.ul`

    list-style: none;
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
    width: 30%;

    li {
      padding: 18px 10px;
    }

    @media (max-width: 768px) {
        flex-flow: column nowrap;  
        position: fixed;
        transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)' };
        right: 0px;
        height: 20vh;
        width: 50%;
        top: 0;
        background-color: #b1d1c5;
        align-items: center;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;
    
    }

`;

const RightNav = ({open}) => {
    return (
        <Ul className="navbar-link"  open={open}>
            <li><a href='/login'  id='home-btn'><p>Login</p></a></li>
            <li><a href='/signup' id='home-btn'><p>Signup</p></a></li>
            <li><a href='/private' id='home-btn'><p>Perfil</p></a></li>
        </Ul>
    )
}

export default RightNav