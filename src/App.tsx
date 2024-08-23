
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store';
import UserContext from './context/UserContext';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import Settings from './components/Settings';
import { Home } from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './components/Footer';
// import './App.css'
import AuthenticationGaurd from './components/AuthenticationGaurd';
import { ProfilePage } from './components/ProfilePage';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserProvider } from './hooks/UserProvider';





export const App: React.FC = () => {
  const queryClient = new QueryClient();
  const { user: authUser } = useAuth0();
  const { user, setUser } = useUserProvider();

  //authorization
  useEffect(() => {
    if (authUser) {
      const newUser = {
        id: authUser.sub || '',
        username: authUser.name ?? '',
        email: authUser.email ?? '',
        password: '',
        name: {
          firstname: authUser.given_name ?? '',
          lastname: authUser.family_name ?? '',
        },
        isLoggedIn: true,
        cart: user?.cart || [],
      }
      setUser(newUser);
    }
  }, [authUser, setUser])


  return (


    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <UserContext.Provider value={{ user, setUser }}>
            <Router>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<AuthenticationGaurd component={Products} />} />
                <Route path='/cart' element={<AuthenticationGaurd component={ShoppingCart} />} />
                <Route path='/settings' element={<AuthenticationGaurd component={Settings} />} />
                <Route path='/profile' element={<AuthenticationGaurd component={ProfilePage} />} />
              </Routes>
            </Router>
            <Footer />
          </UserContext.Provider>
        </Provider>
      </QueryClientProvider>
    </>


  )


}


