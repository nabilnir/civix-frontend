import axios from 'axios';

export const handlePayment = async (amount, type, issueId = null) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    if (!apiUrl) {
      throw new Error('API URL is not configured. Please check your environment variables.');
    }
    
    // Simulate payment processing
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Record payment in database
    const token = localStorage.getItem('civix-token');
    const response = await axios.post(
      `${apiUrl}/api/payments`,
      {
        amount,
        type,
        issueId,
        transactionId,
        method: 'simulated',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return {
        success: true,
        transactionId,
        payment: response.data.data,
      };
    }

    throw new Error('Payment failed');
  } catch (error) {
    console.error('Payment error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Payment processing failed',
    };
  }
};

