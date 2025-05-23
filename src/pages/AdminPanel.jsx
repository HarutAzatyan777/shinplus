// src/components/AdminPanel.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { fetchUsersAPI, deleteUserAPI, updateUserRoleAPI } from '../api/api';
import '../styles/AdminPanel.css'; // ստանդարտ css
import MakeAdmin from '../components/MakeAdmin';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUsersAPI();
      const data = response.data;
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setUsers([]);
        setError('API-ից ստացված տվյալները սխալ են։');
      }
    } catch (err) {
      setError(err.message || 'Օգտատերերի բեռնումը ձախողվեց։');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (uid) => {
    if (!window.confirm('Վստա՞հ ես, որ ցանկանում ես ջնջել այս օգտատիրոջը։')) return;
    setActionLoading(true);
    try {
      await deleteUserAPI(uid);
      setMessage('Օգտատերը հաջողությամբ ջնջվեց։');
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Ջնջման սխալ։');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRoleChange = async (uid, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    setActionLoading(true);
    try {
      await updateUserRoleAPI(uid, newRole);
      setMessage(`Օգտատիրոջ դերը փոխվեց՝ ${newRole}։`);
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Դերի փոփոխման սխալ։');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <h2>👑 Ադմին վահանակ</h2>

      {loading ? (
        <p>Բեռնվում է...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {message && <p className="success">{message}</p>}

          <table className="user-table">
            <thead>
              <tr>
                <th>UID</th>
                <th>Email</th>
                <th>Անուն</th>
                <th>Դեր</th>
                <th>Գործողություններ</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-users">Չկան օգտատերեր։</td>
                </tr>
              ) : (
                users.map(({ uid, email, name, role }) => (
                  <tr key={uid}>
                    <td>{uid}</td>
                    <td>{email}</td>
                    <td>{name || '-'}</td>
                    <td>{role || 'user'}</td>
                    <td>
                      <button
                        onClick={() => handleRoleChange(uid, role)}
                        disabled={actionLoading}
                      >
                        Փոխել դեր
                      </button>
                      <button
                        onClick={() => handleDelete(uid)}
                        disabled={actionLoading}
                        className="delete-btn"
                      >
                        Ջնջել
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
      <MakeAdmin />
    </div>
  );
};

export default AdminPanel;
