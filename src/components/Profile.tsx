import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if(isLoading) {
        return <h1>Loading...</h1>
    }

  return (


    <div>
        {isAuthenticated && ( 
            <div>
                <img src={user?.picture} alt={user?.name} />
                {/* <h1>{user?.name}</h1> */}
                {/* <p>{user?.email}</p> */}
            </div>
        )}
        

    </div>



  )


}


