// routes/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f4f6f8]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#238ae9] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-['Satoshi'] text-[#242424] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }

  // Redirect to login while saving the location user was trying to access
  return <Navigate to="/login" state={{ from: location }} replace />;
}