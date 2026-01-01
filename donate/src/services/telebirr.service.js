exports.initiatePayment = async (donation) => {
  return {
    provider: 'telebirr',
    orderId: donation.id,
    amount: donation.amount,
    message: 'Telebirr payment initiated (mock)'
  };
};
