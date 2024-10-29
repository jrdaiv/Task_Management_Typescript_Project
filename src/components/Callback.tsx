import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Callback = () => {
    const { isAuthenticated, user } = useAuth0();
    const navigate = useNavigate();

    // Redirect to home or desired page after login
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Change this to any page you want the user to land on after login
        }
    }, [isAuthenticated, navigate]);

    return <div>Redirecting...</div>;
};

export default Callback;
