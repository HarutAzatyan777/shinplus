import { useState } from 'react';
import axios from 'axios';

const MakeAdmin = () => {
  const [email, setEmail] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/make-admin', {
        email,
        adminSecret,
      });

      setMessage(response.data.message);
      setEmail('');
      setAdminSecret('');
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Սխալ տեղի ունեցավ։');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Ադմին ստեղծում (պաշտպանված)</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Օգտվողի Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Admin գաղտնաբառ"
          value={adminSecret}
          onChange={(e) => setAdminSecret(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Դարձնել Admin</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '2rem auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.6rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
};

export default MakeAdmin;
