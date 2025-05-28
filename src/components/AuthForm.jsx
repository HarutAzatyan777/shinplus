import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../redux/authSlice';
import { registerUser, loginUser, resendVerificationEmail } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css';

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // base64 or URL
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Convert selected image to Base64 string (optional)
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      setMessage('Գաղտնաբառերը չեն համընկնում։');
      return;
    }

    if (!name.trim() || !username.trim()) {
      setMessage('Խնդրում ենք լրացնել անունը և օգտանունը։');
      return;
    }

    try {
      await registerUser({
        email,
        password,
        name,
        username,
        profilePicture, // base64 նկար
      });
      setMessage('Գրանցումը հաջողվեց։ Ստուգիր քո email-ը հաստատման համար։');
      setIsRegistering(false);
      setEmail('');
      setPassword('');
      setRepeatPassword('');
      setName('');
      setUsername('');
      setProfilePicture(null);
      setShowResend(false);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Սխալ գրանցման ժամանակ։');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      localStorage.setItem('token', res.data.token);

      dispatch(
        loginSuccess({
          token: res.data.token,
          user: {
            email,
            profilePicture: res.data.user?.profilePicture || null,
            name: res.data.user?.name || '',
            username: res.data.user?.username || '',
          },
        })
      );
      setMessage('');
      setShowResend(false);
      navigate('/account');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Մուտքի սխալ։';
      setMessage(errorMsg);

      if (errorMsg.toLowerCase().includes('verify your email')) {
        setShowResend(true);
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail(email);
      setMessage('Հաստատման նամակը նորից ուղարկվեց։ Ստուգիր քո inbox-ը կամ spam-ը։');
      setShowResend(false);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Չհաջողվեց նորից ուղարկել նամակը։');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setName('');
    setUsername('');
    setProfilePicture(null);
    setMessage('');
    setIsRegistering(false);
    setShowResend(false);
    navigate('/login');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (isRegistering) {
        handleRegister();
      } else {
        handleLogin();
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>{isRegistering ? 'Գրանցում' : 'Մուտք'}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="username"
      />

      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Գաղտնաբառ"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete={isRegistering ? "new-password" : "current-password"}
          style={{ paddingRight: '70px' }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            background: 'transparent',
            border: 'none',
            color: '#007bff',
            fontWeight: 'bold',
          }}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? 'Թաքցնել' : 'Ցույց տալ'}
        </button>
      </div>

      {isRegistering && (
        <>
          <input
            type="text"
            placeholder="Անուն"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="name"
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Կրկնիր գաղտնաբառը"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="new-password"
          />

          <div style={{ margin: '1rem 0' }}>
            <label>
              Ընտրիր պրոֆիլային նկար:
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </label>
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile Preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: '50%' }}
              />
            )}
          </div>
        </>
      )}

      <button onClick={isRegistering ? handleRegister : handleLogin}>
        {isRegistering ? 'Գրանցվել' : 'Մուտք'}
      </button>

      {showResend && (
        <button onClick={handleResendVerification} style={{ marginTop: '1rem' }}>
          Նորից ուղարկել հաստատման նամակը
        </button>
      )}

      <button
        onClick={() => {
          setIsRegistering(!isRegistering);
          setMessage('');
          setEmail('');
          setPassword('');
          setRepeatPassword('');
          setName('');
          setUsername('');
          setProfilePicture(null);
          setShowResend(false);
          setShowPassword(false);
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
