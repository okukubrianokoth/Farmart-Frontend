import React, { useState } from 'react';
import { paymentService } from '../../services/paymentService';
import { toast } from 'react-toastify';

const MpesaPayment = ({ order, onPaymentSuccess, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  //const { user } = useSelector((state) => state.auth);

  // Normalize phone number into Safaricom's required format (2547XXXXXXXX)
  const formatPhoneNumber = (phone) => {
    let formatted = phone.trim();
    if (formatted.startsWith('+')) formatted = formatted.replace('+', '');
    if (formatted.startsWith('0')) formatted = '254' + formatted.substring(1);
    if (!formatted.startsWith('254')) {
      toast.error('Invalid phone number format. Use 07XXXXXXXX');
      return null;
    }
    return formatted;
  };

  const handlePayment = async () => {
    if (!phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!order) {
      toast.error('No order found');
      return;
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (!formattedPhone) return; // stop if invalid

    setIsProcessing(true);
    try {
      console.log('📤 Initiating M-PESA payment with:', formattedPhone);
      const response = await paymentService.initiateMpesaPayment(order.id, formattedPhone);

      toast.info('Payment initiated! Check your phone for STK Push.');

      // Start polling with a max of 20 attempts (~1 minute)
      pollPaymentStatus(response.data.checkout_request_id);
    } catch (error) {
      console.error('Payment failed:', error);
      const message = error.response?.data?.error || error.response?.data?.message || error.message;
      toast.error(`Payment failed: ${message}`);
      setIsProcessing(false);
    }
  };

  // Polling function with attempt limit
  const pollPaymentStatus = async (checkoutRequestId, attempt = 1, maxAttempts = 20) => {
    if (attempt > maxAttempts) {
      toast.warning('Payment is still pending. Please check your M-Pesa app.');
      setIsProcessing(false);
      return;
    }

    try {
      const response = await paymentService.checkPaymentStatus(checkoutRequestId);
      console.log('🔎 Payment status:', response.data);

      const status = response.data.payment_status || response.data.ResultCode;
      if (status === 'paid' || status === '0') {
        toast.success('✅ Payment completed successfully!');
        onPaymentSuccess();
        setIsProcessing(false);
      } else if (status === 'failed') {
        toast.error('❌ Payment failed.');
        setIsProcessing(false);
      } else {
        // still pending → wait and retry
        setTimeout(() => pollPaymentStatus(checkoutRequestId, attempt + 1, maxAttempts), 3000);
      }
    } catch (error) {
      console.error('Payment status check failed:', error);
      // Retry silently
      setTimeout(() => pollPaymentStatus(checkoutRequestId, attempt + 1, maxAttempts), 3000);
    }
  };

  return (
    <div className="payment-modal">
      <div className="modal-content">
        <h2>Complete Payment with M-Pesa</h2>

        <div className="payment-details">
          <p><strong>Order ID:</strong> #{order.id}</p>
          <p><strong>Amount:</strong> KES {order.total_amount}</p>
        </div>

        <div className="form-group">
          <label>M-Pesa Phone Number</label>
          <input
            type="tel"
            placeholder="e.g., 0712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <small>Enter your M-Pesa registered phone number</small>
        </div>

        <div className="payment-instructions">
          <h4>Instructions:</h4>
          <ol>
            <li>Enter your M-Pesa phone number</li>
            <li>Click "Pay with M-Pesa"</li>
            <li>Check your phone for STK Push prompt</li>
            <li>Enter your M-Pesa PIN to complete payment</li>
          </ol>
        </div>

        <div className="payment-actions">
          <button
            className="btn btn-primary"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay with M-Pesa'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MpesaPayment;