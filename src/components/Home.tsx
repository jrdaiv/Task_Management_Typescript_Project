import React, { useContext } from 'react'
import '../App.css'
import UserContext from '../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import { ProfilePage } from './ProfilePage';
import NavBar from './NavBar';
import { Spinner } from 'react-bootstrap';



export const Home: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  const message: string = 'Please help yourself to the Products Page'
  const message2: string = 'Please log in to view products '

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />
  }



  return (

    <>
      <NavBar />
      <div className='home-container '>
        {isAuthenticated ? (
          <div className='mt-[300px]'>
            <div className='flex justify-center'>
              <ProfilePage />
            </div>
            <h1 className='font-bold text-3xl flex justify-center'>Hi, {user?.name}</h1>
            <h3 className='font-semibold text-2xl flex justify-center'>{message}</h3>
          </div>
        ) : (
          <h1 className='font-bold text-3xl flex justify-center mt-[300px]'>{message2}</h1>

        )}

      </div>
    </>



  )



}

