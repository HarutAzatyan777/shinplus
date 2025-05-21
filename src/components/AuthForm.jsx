import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
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
    if (password !== repeatPassword) {
      setMessage('Գաղտնաբառերը չեն համընկնում։');
      return;
    }
    try {
      await registerUser(email, password);
      setIsRegistering(false);
      setMessage('Գրանցումը հաջողվեց։ Հիմա մուտք գործիր։');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Սխալ գրանցման ժամանակ։');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      dispatch(loginSuccess({ token: res.data.token, user: { email } }));
      navigate('/account');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Մուտքի սխալ։');
    }
  };

  return (
    <div className="auth-form">
      <h2>{isRegistering ? 'Գրանցում' : 'Մուտք'}</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Գաղտնաբառ" value={password} onChange={e => setPassword(e.target.value)} />

      {isRegistering && (
        <input type="password" placeholder="Կրկնիր գաղտնաբառը" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
      )}

      <button onClick={isRegistering ? handleRegister : handleLogin}>
        {isRegistering ? 'Գրանցվել' : 'Մուտք'}
      </button>

      <button onClick={() => setIsRegistering(!isRegistering)} className="switch-btn">
        {isRegistering ? 'Արդեն ունե՞ս հաշիվ' : 'Գրանցվել նոր հաշիվով'}
      </button>

      <p className="message">{message}</p>
    </div>
  );
};

export default AuthForm;
