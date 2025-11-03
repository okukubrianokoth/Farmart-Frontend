// import api from './api';

// export const orderService = {
//   getUserOrders: () => {
//     return api.get('/orders/user/my-orders');
//   },

//   getFarmerOrders: () => {
//     return api.get('/orders/farmer/my-sales');
//   },

//   getOrder: (orderId) => {
//     return api.get(`/orders/${orderId}`);
//   },

//   updateOrderStatus: (orderId, data) => {
//     return api.put(`/orders/${orderId}/status`, data);
//   }
// };
// src/services/orderService.js
import api from './api';

export const orderService = {
  getUserOrders: () => api.get('/orders/user/my-orders'),

  getFarmerOrders: () => api.get('/orders/farmer/my-sales'),

  getOrder: (orderId) => api.get(`/orders/${orderId}`),

  updateOrderStatus: (orderId, data) =>
    api.put(`/orders/${orderId}/status`, data),
};
