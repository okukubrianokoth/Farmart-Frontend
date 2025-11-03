// import api from './api';

// export const paymentService = {
//   initiateMpesaPayment: (orderId, phoneNumber) => {
//     return api.post('/payments/initiate-payment', {
//       order_id: orderId,
//       phone: phoneNumber, // ✅ match backend
//     });
//   },

//   checkPaymentStatus: (checkoutRequestId) => {
//     return api.get(`/payments/check-payment/${checkoutRequestId}`);
//   },
// };

// src/services/paymentService.js
import api from './api';

export const paymentService = {
  initiateMpesaPayment: (orderId, phoneNumber) => {
    return api.post('/payments/initiate-payment', {
      order_id: orderId,
      phone: phoneNumber,
    });
  },

  checkPaymentStatus: (checkoutRequestId) => {
    return api.get(`/payments/check-payment/${checkoutRequestId}`);
  },
};
