import { createSlice } from '@reduxjs/toolkit';

// Ստուգել, արդյոք token-ը դեռ գործող է՝ expiresAt-ի հիման վրա
export const isTokenValid = () => {
  const expiresAt = localStorage.getItem('expiresAt');
  if (!expiresAt) return false;

  const expiresAtTime = Number(expiresAt);
  if (isNaN(expiresAtTime)) return false;

  const currentTime = Date.now();

  return currentTime < expiresAtTime;
};

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('token') && isTokenValid(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user, expiresAt } = action.payload;
    
      state.token = token;
    
      // Հաստատել, որ `uid` կա `user`-ում
      state.user = {
        uid: user.uid || null,
        email: user.email || '',
        username: user.username || '',
        profilePicture: user.profilePicture || '',
        role: user.role || 'user',
      };
    
      state.isLoggedIn = true;
    
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(state.user));
    
      if (expiresAt) {
        localStorage.setItem('expiresAt', expiresAt);
      }
    },
    
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('expiresAt');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
