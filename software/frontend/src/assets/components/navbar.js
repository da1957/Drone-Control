import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import DroneLogo from '../img/drone.svg';
import '../css/navbar.css';

const myNavbar = (props) => {
    return (
        <div>
            <Navbar className="py-0 nav-outline navbar-expand-lg" color="light" light>
                <NavbarBrand href="/" className="py-0" style={{display: 'flex', alignItems: 'center'}}>
                    <img src={DroneLogo} alt="DroneLogo" style={{height: 'auto', width: '20%'}}/>
                    <span className="ml-3" style={{fontWeight: 'bold', fontSize: '115%'}}>dronecontrol</span>
                </NavbarBrand>
                <Nav className="navbar-nav ml-auto">
                    <NavItem>
                        <NavLink exact className= "nav-link" activeClassName="nav-link active" to="/" style={{fontSize: '115%'}}>home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact className= "nav-link" activeClassName="nav-link active" to="/about" style={{fontSize: '115%'}}>about</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>

    )
}

export default myNavbar