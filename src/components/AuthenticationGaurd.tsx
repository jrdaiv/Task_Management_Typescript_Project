import React, { ComponentType, ReactNode } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';


interface AuthenticationGaurdProps {
  component: ComponentType<object>;
  
}


const AuthenticationGaurd = ({component}: AuthenticationGaurdProps) => {
    const Component = withAuthenticationRequired(component, {
        returnTo: '/',
        onRedirecting: () => (
            <div>
                Loading...
            </div>
        )
    })


  return <Component />;




}

export default AuthenticationGaurd