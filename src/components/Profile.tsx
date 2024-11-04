import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if(isLoading) {
        return <h1>Loading...</h1>
    }

  return (


    <div >
        {isAuthenticated && ( 
            <div>
                <img className='w-[100px] rounded-2xl' src={user?.picture} alt={user?.name} />
            </div>
        )}
        

    </div>



  )


}


