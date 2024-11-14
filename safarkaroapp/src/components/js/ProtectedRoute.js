import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('access_token'); 
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page, passing the current location in state
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
