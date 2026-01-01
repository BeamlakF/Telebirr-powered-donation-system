const donations = [];

class Donation {
  constructor({ id, amount, donorName }) {
    this.id = id;
    this.amount = amount;
    this.donorName = donorName;
    this.status = 'PENDING';
    this.provider = 'telebirr';
    this.createdAt = new Date();
  }
}

module.exports = { Donation, donations };
