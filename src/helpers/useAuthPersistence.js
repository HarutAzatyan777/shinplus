import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const useAuthPersistence = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Կարելի է նաև user տվյալներ պահել localStorage-ում, եթե դրանք ունես
      dispatch(
        loginSuccess({
          token,
          user: {
            email: localStorage.getItem('email') || '',
            profilePicture: localStorage.getItem('profilePicture') || '',
            name: localStorage.getItem('name') || '',
            username: localStorage.getItem('username') || '',
          },
        })
      );
    }
  }, [dispatch]);
};

export default useAuthPersistence;
