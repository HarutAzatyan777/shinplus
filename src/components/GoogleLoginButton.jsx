import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_BASE = 'https://shinplusserv-production.up.railway.app/auth';

const GoogleLoginButton = () => {
  const handleSuccess = async credentialResponse => {
    try {
      // credentialResponse.credential - սա Google-ից ստացված ID Token է
      const idToken = credentialResponse.credential;

      // Ուղարկում ենք backend՝ վերիֆիկացնելու համար
      const res = await axios.post(`${API_BASE}/google-login`, { idToken });

      console.log('Backend response:', res.data);
      alert('Մուտքը հաջողվեց՝ ' + JSON.stringify(res.data));
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
