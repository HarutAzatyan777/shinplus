import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const useAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerIdRef = useRef(null);
  const hasSetTimerRef = useRef(false);

  useEffect(() => {
    if (hasSetTimerRef.current) return; // Եթե արդեն սեթ արել ենք՝ նորից չանել

    const expiresAt = localStorage.getItem('expiresAt');
    if (!expiresAt) return;

    const expirationTime = Number(expiresAt);
    const now = Date.now();
    const timeLeft = expirationTime - now;

    if (timeLeft <= 0) {
      dispatch(logout());
      navigate('/login');
    } else {
      hasSetTimerRef.current = true;

      timerIdRef.current = setTimeout(() => {
        dispatch(logout());
        navigate('/login');
      }, timeLeft);
    }

    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
        hasSetTimerRef.current = false;
      }
    };
  }, [dispatch, navigate]);
};

export default useAutoLogout;
