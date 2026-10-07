import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export const useAuthCheck = () => {
  const { user, token } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = Boolean(user && token);

  const checkAuth = (message = 'Please log in to play music') => {
    if (!isAuthenticated) {
      toast.error(message);
      navigate('/login', { state: { from: location } });
      return false;
    }
    return true;
  };

  return { isAuthenticated, checkAuth, user, token };
};

export default useAuthCheck;
