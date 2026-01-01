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
  // we will complete this in Phase 5
  res.send('OK');
};
