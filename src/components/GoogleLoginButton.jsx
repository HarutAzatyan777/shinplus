import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'https://shinplusserv-production.up.railway.app/auth';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async credentialResponse => {
    try {
      const idToken = credentialResponse.credential;

      const res = await axios.post(`${API_BASE}/google`, { idToken });

      console.log('Backend response:', res.data);
      alert('Մուտքը հաջողվեց՝ ' + JSON.stringify(res.data));

      // Երբ հաջող մուտք, տեղափոխում ենք /calculators
      navigate('/calculators');
    } catch (error) {
      console.error('Google login error:', error.response?.data || error.message);
      alert('Մուտքը ձախողվեց');
    }
  };

  const handleError = () => {
    alert('Google մուտքը ձախողվեց');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
