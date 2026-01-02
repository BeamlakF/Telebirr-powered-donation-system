// exports.initiatePayment = async (donation) => {
//   return {
//     provider: 'telebirr',
//     orderId: donation.id,
//     amount: donation.amount,
//     message: 'Telebirr payment initiated (mock)'
//   };
// };


const axios = require('axios');
const signTelebirr = require('../utils/signTelebirr');

exports.initiatePayment = async (donation) => {
  const payload = {
    appId: process.env.TELEBIRR_APP_ID,
    merchantId: process.env.TELEBIRR_MERCHANT_ID,
    orderId: donation.id,
    amount: donation.amount,
    callbackUrl: process.env.CALLBACK_URL,
    timestamp: Date.now()
  };

  payload.sign = signTelebirr(
    payload,
    process.env.TELEBIRR_PRIVATE_KEY
  );

  const response = await axios.post(
    process.env.TELEBIRR_API_URL,
    payload
  );

  return response.data;
};
