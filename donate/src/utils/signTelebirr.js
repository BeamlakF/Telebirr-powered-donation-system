const crypto = require('crypto');

module.exports = function signTelebirr(params, privateKey) {
  if (!privateKey) {
    throw new Error('Telebirr private key missing');
  }

  const formattedKey = privateKey.replace(/\\n/g, '\n');

  const sortedKeys = Object.keys(params).sort();
  const signingString = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingString);
  signer.end();

  return signer.sign(formattedKey, 'base64');
};
