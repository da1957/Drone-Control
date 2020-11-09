import React from 'react';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';

// function SignOut(props) {
//     return props.auth.currentUser && (
//       <Button onClick={() => props.auth.signOut()} variant="outline-light">Sign Out</Button>
//     )
//   }

const myNavbar = (props) => {
    return (
        <div>
            <Navbar color="dark" dark>
                <NavbarBrand>DRONE CONTROL</NavbarBrand>
                <Nav className="ml-auto">
                </Nav>
            </Navbar>
        </div>

    )
}


export default myNavbar