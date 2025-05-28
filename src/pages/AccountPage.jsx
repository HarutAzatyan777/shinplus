import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountPage.css';
import Notes from './Notes';

const AccountPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="construction-site">
      <h1>Բարի գալուստ {user?.username  || 'Օգտատեր'} 👷‍♂️</h1>
      <Notes />
      <button className="logout-btn" onClick={handleLogout}>Ելք</button>
    </div>
  );
};

export default AccountPage;
