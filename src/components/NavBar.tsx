import React, { useContext, useState, useEffect } from 'react';
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse,
    Drawer,
} from "@material-tailwind/react";
import { useAuth0 } from '@auth0/auth0-react';
import UserContext, { User } from '../context/UserContext';

const NavBar: React.FC = () => {
    const { user, setUser } = useContext(UserContext);
    const { user: auth0User, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const [openNav, setOpenNav] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    useEffect(() => {
        if (isAuthenticated && auth0User) {
            const userData: User = {
                id: auth0User.sub || '',
                username: auth0User.name || '',
                password: '',
                name: {
                    firstname: auth0User.given_name || '',
                    lastname: auth0User.family_name || '',
                },
                email: auth0User.email || '',
                cart: [],
                isLoggedIn: true,
            };

            setUser((prevUser) => {
                const isSameUser =
                    prevUser?.id === userData.id &&
                    prevUser?.username === userData.username;
                return isSameUser ? prevUser : userData;
            });

            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            // Only reset user if it's not already null
            setUser((prevUser) => (prevUser ? null : prevUser));
        }
    }, [isAuthenticated, auth0User, setUser]);

    return (
        <>
            <Navbar className="mx-auto max-w-screen-2xl px-4 py-2 bg-white shadow-xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="container mx-auto flex items-center justify-between">
                    {/* E-Commerce Title */}
                    <Typography
                        as="a"
                        href="/"
                        variant="h5"
                        className="cursor-pointer text-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        E-Commerce
                    </Typography>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <div className='flex space-x-4'>
                            <Typography as="a" href="/products" className="text-gray-800 font-medium hover:text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Products
                            </Typography>
                            <Typography as="a" href="/cart"
                                className="text-gray-800 hover:text-gray-600 font-medium"
                                color="gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                                Cart
                            </Typography>
                        </div>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">

                                <Button variant="text" size="sm" color='red' onClick={handleLogout} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button variant="text" size="sm" color="green" onClick={() => setShowLogin(true)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    Login
                                </Button>
                                <Button variant="text" size="sm" color="blue" onClick={() => setShowRegister(true)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    Register
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Icon */}
                    <IconButton
                        variant="text"
                        className="ml-auto lg:hidden"
                        onClick={() => setOpenNav(!openNav)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        {/* Simple text for menu icon */}
                        ☰
                    </IconButton>
                </div>

                {/* Mobile Links */}
                <Collapse open={openNav}>
                    <div className="flex flex-col space-y-2 lg:hidden mt-4">
                        <a href="/products" className="text-gray-800 hover:text-gray-600">
                            Products
                        </a>
                        <a href="/cart" className="text-gray-800 hover:text-gray-600">
                            Cart
                        </a>

                        {isAuthenticated ? (
                            <>

                                <Button variant="gradient" size="sm" color='red' onClick={handleLogout} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="text" size="sm" color="green" onClick={() => setShowLogin(true)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    Login
                                </Button>
                                <Button variant="text" size="sm" color="blue" onClick={() => setShowRegister(true)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    Register
                                </Button>
                            </>
                        )}
                    </div>
                </Collapse>
            </Navbar>

            {/* Login Drawer */}
            <Drawer open={showLogin} onClose={() => setShowLogin(false)} placement="right" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="p-4 w-full">
                    <h2 className="text-lg text-center underline font-semibold mb-4">Login</h2>
                    <Button
                        variant="gradient"
                        size="md"
                        color='green'
                        onClick={() => loginWithRedirect()}
                        fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        Login with Auth0
                    </Button>
                </div>
            </Drawer>

            {/* Register Drawer */}
            <Drawer open={showRegister} onClose={() => setShowRegister(false)} placement="right" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="p-4 w-full">
                    <h2 className="text-lg font-semibold text-center underline mb-4">Register</h2>
                    <Button
                        variant="gradient"
                        size="md"
                        color='blue'
                        onClick={() => loginWithRedirect()}
                        fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        Register with Auth0
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

export default NavBar;
