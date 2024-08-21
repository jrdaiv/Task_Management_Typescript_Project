import { useEffect } from 'react';
import React, { useContext, useState, FormEvent } from 'react';
import { Navbar, Nav, Button, Offcanvas, Form, NavDropdown, Badge } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import '../App.css'

interface User {
    id: string,
    name: string,
    email: string,
    // password: string,
    userName: string,
    // token: string,
    cart?: any[],
    isLoggedIn: boolean,
}

const NavBar: React.FC = () => {
    const { user, setUser } = useContext(UserContext);
    const { user: auth0User, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    // const navigate = useNavigate();

    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showRegister, setShowRegister] = useState<boolean>(false);



    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated && auth0User) {
            const userData: User = {
                id: auth0User.sub || '',
                userName: auth0User.name || '',
                name: auth0User.nickname || '',
                email: auth0User.email || '',
                // password: '',
                // token: auth0User.accessToken!,
                isLoggedIn: true,
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            // navigate('/')
        } else {
            setUser(null);
        }
    }, [isAuthenticated, auth0User, setUser]);




    return (


        <div>
            <Navbar className='navbar-home' bg='transparent' expand="sm">
                <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link href="/products">Products</Nav.Link>
                                <NavDropdown title="Account" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/cart">
                                    Cart <Badge>{user?.cart?.length || 0}</Badge>
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Button className='text-white' variant="text" onClick={handleShowLogin}>Login</Button>
                                <Button className='text-white' variant="text" onClick={handleShowRegister}>Register</Button>
                            </>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </Navbar>

            <Offcanvas className='sm' show={showLogin} onHide={handleCloseLogin}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Login</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Button className='login-btn' variant="primary" onClick={() => loginWithRedirect()} type="submit">
                            Login
                        </Button>
                    </Form>
                </Offcanvas.Body>

            </Offcanvas>

            <Offcanvas show={showRegister} onHide={handleCloseRegister}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Register</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Button className='register-btn' variant="primary" type="submit" onClick={() => loginWithRedirect()}>
                            Register
                        </Button>

                    </Form>
                </Offcanvas.Body>

            </Offcanvas>


        </div>


    )


}

export default NavBar