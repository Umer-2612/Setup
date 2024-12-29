import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { logout } from '../store/auth.slice';
import { useSignInMutation, useSignUpMutation } from '../services/auth.api';

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return {
    ...auth,
    signIn,
    signUp,
    logout: handleLogout,
  };
};
