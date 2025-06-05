import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../redux/authSlice';
import { registerUser, loginUser, resendVerificationEmail } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css';

const inputStyle = {
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  width: '100%',
  boxSizing: 'border-box',
};

const iconButtonStyle = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  fontSize: '1.2rem',
};

const PasswordInput = ({
  value,
  onChange,
  placeholder,
  showPassword,
  toggleShowPassword,
  autoComplete,
  onKeyDown,
}) => (
  <div style={{ position: 'relative' }}>
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      onKeyDown={onKeyDown}
      style={{ ...inputStyle, paddingRight: '40px' }}
    />
    <button
      type="button"
      onClick={toggleShowPassword}
      style={iconButtonStyle}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? '🙈' : '👁️'}
    </button>
  </div>
);

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const [showResend, setShowResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setName('');
    setUsername('');
    setProfilePicture(null);
    setShowResend(false);
    setShowPassword(false);
    setShowRepeatPassword(false);
    setLoading(false);
  };

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      setMessage('Գաղտնաբառերը չեն համընկնում։');
      setMessageType('error');
      return;
    }
    if (!name.trim() || !username.trim()) {
      setMessage('Խնդրում ենք լրացնել անունը և օգտանունը։');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        email,
        password,
        name,
        username,
        profilePicture,
      });
      setMessage('Գրանցումը հաջողվեց։ Ստուգիր քո email-ը հաստատման համար։');
      setMessageType('success');
      resetForm();
      setIsRegistering(false);
    } catch (err) {
      if (!err.response) {
        setMessage('Սերվերի հետ խնդիր կա, փորձեք ավելի ուշ։');
      } else {
        setMessage(err.response.data?.error || 'Սխալ գրանցման ժամանակ։');
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      localStorage.setItem('token', res.data.token);
  
      dispatch(
        loginSuccess({
          token: res.data.token,
          user: {
            uid: res.data.user?.uid || '', // ✅ Ավելացրու uid այստեղ
            email,
            profilePicture: res.data.user?.profilePicture || null,
            name: res.data.user?.name || '',
            username: res.data.user?.username || '',
          },
        })
      );
  
      setMessage('');
      setMessageType('');
      setShowResend(false);
      navigate('/account');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Մուտքի սխալ։';
      setMessage(errorMsg);
      setMessageType('error');
      if (errorMsg.toLowerCase().includes('verify your email')) {
        setShowResend(true);
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleResendVerification = async () => {
    setLoading(true);
    try {
      await resendVerificationEmail(email);
      setMessage('Հաստատման նամակը նորից ուղարկվեց։ Ստուգիր քո inbox-ը կամ spam-ը։');
      setMessageType('success');
      setShowResend(false);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Չհաջողվեց նորից ուղարկել նամակը։');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    resetForm();
    setIsRegistering(false);
    navigate('/login');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      isRegistering ? handleRegister() : handleLogin();
    }
  };

  return (
    <div className="auth-form">
      <h2>{isRegistering ? 'Գրանցում' : 'Մուտք'}</h2>

      {message && (
        <div
          style={{
            padding: '0.75rem',
            marginTop: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            color: messageType === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          }}
        >
          {message}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="username"
        style={inputStyle}
        disabled={loading}
      />

      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Գաղտնաբառ"
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          autoComplete={isRegistering ? 'new-password' : 'current-password'}
          onKeyDown={handleKeyDown}
        />

        {isRegistering && (
          <PasswordInput
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Կրկնիր գաղտնաբառը"
            showPassword={showRepeatPassword}
            toggleShowPassword={() => setShowRepeatPassword(!showRepeatPassword)}
            autoComplete="new-password"
            onKeyDown={handleKeyDown}
          />
        )}
      </div>

      {isRegistering && (
        <>
          <input
            type="text"
            placeholder="Անուն"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="name"
            style={{ ...inputStyle, marginTop: '1rem' }}
            disabled={loading}
          />

          <input
            type="text"
            placeholder="Օգտանուն"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="username"
            style={{ ...inputStyle, marginTop: '1rem' }}
            disabled={loading}
          />

          <div style={{ marginTop: '1rem' }}>
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile Preview"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  marginTop: '0.5rem',
                  borderRadius: '50%',
                  border: '2px solid #ccc',
                }}
              />
            )}
          </div>
        </>
      )}

      <button
        onClick={isRegistering ? handleRegister : handleLogin}
        style={{ marginTop: '1.5rem', width: '100%' }}
        disabled={loading}
      >
        {loading ? 'Բեռնվում է...' : isRegistering ? 'Գրանցվել' : 'Մուտք'}
      </button>

      {showResend && (
        <button
          onClick={handleResendVerification}
          style={{
            marginTop: '0.5rem',
            color: '#007bff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          disabled={loading}
        >
          Հաստատման նամակ նորից ուղարկել
        </button>
      )}

      <p style={{ marginTop: '1rem' }}>
        {isRegistering ? 'Արդեն ունեք հաշիվ?' : 'Ոչ դեռ գրանցվել եք?'}{' '}
        <span
          onClick={() => {
            setIsRegistering(!isRegistering);
            setMessage('');
            setMessageType('');
          }}
          style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isRegistering ? 'Մուտք' : 'Գրանցվել'}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
