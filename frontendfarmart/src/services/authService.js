// import api from './api';

// export const authService = {
//   login: (email, password) => {
//     return api.post('/auth/login', { email, password });
//   },

//   register: (userData) => {
//     return api.post('/auth/register', userData);
//   },

//   getProfile: () => {
//     return api.get('/auth/profile');
//   },

//   updateProfile: (profileData) => {
//     return api.put('/auth/profile', profileData);
//   }
// };
// src/services/authService.js
import api from './api';

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),

  register: (userData) => api.post('/auth/register', userData),

  getProfile: () => api.get('/auth/profile'),

  updateProfile: (profileData) => api.put('/auth/profile', profileData),
};
