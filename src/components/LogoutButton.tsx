import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'


export const LogoutButton: React.FC = () => {
    const { logout } = useAuth0();


  return (


    <div>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>Logout</button>


    </div>


  )


}

