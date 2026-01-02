const { Donation, donations } = require('../models/Donation');
const telebirrService = require('../services/telebirr.service');
const crypto = require('crypto');

exports.createDonation = async (req, res) => {
  const { amount, donorName } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const id = crypto.randomUUID();

  const donation = new Donation({
    id,
    amount,
    donorName: donorName || 'Anonymous'
  });

  donations.push(donation);

  const paymentData = await telebirrService.initiatePayment(donation);

  res.json({
    donationId: donation.id,
    payment: paymentData
  });
};

exports.telebirrCallback = (req, res) => {
  const { sign, orderId, amount, status } = req.body;

  const isValid = verifyTelebirr(
    { orderId, amount, status },
    sign,
    process.env.TELEBIRR_PUBLIC_KEY
  );

  if (!isValid) {
    return res.status(400).send('Invalid signature');
  }

  const donation = donations.find(d => d.id === orderId);

  if (!donation) return res.status(404).send('Not found');

  if (donation.status === 'SUCCESS') {
    return res.send('OK'); // idempotent
  }

  donation.status = status === 'SUCCESS' ? 'SUCCESS' : 'FAILED';

  res.send('OK');
};
