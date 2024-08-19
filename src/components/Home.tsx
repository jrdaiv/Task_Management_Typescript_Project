import React, { useContext } from 'react'
import '../App.css'
import UserContext from '../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import { ProfilePage } from './ProfilePage';
import NavBar from './NavBar';
import { Spinner } from 'react-bootstrap';



export const Home: React.FC = () => {
  // const {user} = useContext(UserContext);
  const { isAuthenticated, isLoading, user } = useAuth0();

  const message: string = 'Please help yourself to the products page'
  const message2: string = 'Please log in to view catalog '

    if(isLoading) {
        return <Spinner animation="border" variant="primary" />
    }

  

  return (

    <>
        <NavBar />
      <div className='home-container'>
          { isAuthenticated ? (
            <div>
              <ProfilePage />
              <h1>Hi, {user?.name}</h1>
              <h3>{message}</h3>
            </div>
          ) : (
            <h1>{message2}</h1>
          
          )}
        
        {/* <div className="home-container">
          
            
        </div> */}
      </div>
    </>



  )



}

