import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../redux/authSlice';
import { registerUser, loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css';

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    console.log('📝 Attempting to register with:', { email, password, repeatPassword });

    if (password !== repeatPassword) {
      setMessage('Գաղտնաբառերը չեն համընկնում։');
      console.warn('❌ Passwords do not match');
      return;
    }

    try {
      const res = await registerUser(email, password);
      console.log('✅ Registration successful:', res);

      setMessage('Գրանցումը հաջողվեց։ Հիմա մուտք գործիր։');
      setIsRegistering(false);
      setEmail('');
      setPassword('');
      setRepeatPassword('');
    } catch (err) {
      console.error('❌ Registration error:', err);
      setMessage(err.response?.data?.error || 'Սխալ գրանցման ժամանակ։');
    }
  };

  const handleLogin = async () => {
    console.log('🔐 Attempting login with:', { email, password });

    try {
      const res = await loginUser(email, password);
      console.log('✅ Login successful, response:', res);

      localStorage.setItem('token', res.data.token);
      dispatch(loginSuccess({ token: res.data.token, user: { email } }));
      setMessage('');
      navigate('/account');
    } catch (err) {
      console.error('❌ Login error:', err);
      setMessage(err.response?.data?.error || 'Մուտքի սխալ։');
    }
  };

  const handleLogout = () => {
    console.log('🚪 Logging out');
    localStorage.removeItem('token');
    dispatch(logout());
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setMessage('');
    setIsRegistering(false);
    navigate('/login');
  };

  return (
    <div className="auth-form">
      <h2>{isRegistering ? 'Գրանցում' : 'Մուտք'}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Գաղտնաբառ"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {isRegistering && (
        <input
          type="password"
          placeholder="Կրկնիր գաղտնաբառը"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
        />
      )}

      <button onClick={isRegistering ? handleRegister : handleLogin}>
        {isRegistering ? 'Գրանցվել' : 'Մուտք'}
      </button>

      <button
        onClick={() => {
          setIsRegistering(!isRegistering);
          setMessage('');
          setEmail('');
          setPassword('');
          setRepeatPassword('');
          console.log('🔄 Switching form mode. Now:', isRegistering ? 'Login' : 'Register');
        }}
        className="switch-btn"
      >
        {isRegistering ? 'Արդեն ունե՞ս հաշիվ' : 'Գրանցվել նոր հաշիվով'}
      </button>

      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
        Դուրս գալ
      </button>

      <p className="message">{message}</p>
    </div>
  );
};

export default AuthForm;
