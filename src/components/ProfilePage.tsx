import React from 'react';
import { Profile } from './Profile';
import { useAuth0 } from '@auth0/auth0-react';

export const ProfilePage: React.FC = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    getAccessTokenSilently().then((token) => {
        console.log(token)
    })


  return (


    <div>
        {isAuthenticated ? <Profile /> : <h1>Please Log In</h1>}
    </div>


  )


}


