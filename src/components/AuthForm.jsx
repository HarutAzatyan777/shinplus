import React, { useState } from 'react';
import { registerUser, loginUser } from './api';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const res = await registerUser(email, password);
      setMessage(`Գրանցված եք։ UID: ${res.data.uid}`);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Սխալ գրանցման ժամանակ');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      setToken(res.data.token);
      setMessage('Մուտք գործեցիր հաջողությամբ։');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Մուտքի սխալ։');
    }
  };

  return (
    <div>
      <h2>Մուտք/Գրանցում</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Գաղտնաբառ" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Գրանցվել</button>
      <button onClick={handleLogin}>Մուտք</button>
      <p>{message}</p>
      {token && <pre>Token: {token}</pre>}
    </div>
  );
};

export default AuthForm;
