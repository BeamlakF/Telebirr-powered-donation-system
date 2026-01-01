const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donation.controller');

router.post('/', donationController.createDonation);
router.post('/telebirr/callback', donationController.telebirrCallback);

module.exports = router;
