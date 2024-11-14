import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove tokens from localStorage
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.setItem('isLogIN',false);
        sessionStorage.removeItem('user_name');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('user_id');
        // Redirect to home page
        navigate('/');
    };

    React.useEffect(() => {
        handleLogout();
    }, []);

    return <div></div>;
};

export default Logout;
