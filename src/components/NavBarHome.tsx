import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { Badge, Button, Nav, Navbar, NavbarBrand, NavDropdown } from 'react-bootstrap'



const NavBarHome = () => {
    const { user, logout, isAuthenticated } = useAuth0();



  return (


    <Navbar className='navbar-home' bg='transparent' expand="sm">
        <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className="ms-auto">
                
                        <Nav.Link href="/products">Products</Nav.Link>
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Header>{isAuthenticated && <div>Hello {user?.name}</div>}</NavDropdown.Header>
                            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/cart">
                            Cart 
                        </Nav.Link>                  
            </Nav>

        </Navbar.Collapse>
    </Navbar>


  )


}



export default NavBarHome