const crypto = require('crypto');

module.exports = function verifyTelebirr(params, signature, publicKey) {
  const sortedKeys = Object.keys(params).sort();

  const verifyString = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(verifyString);
  verifier.end();

  return verifier.verify(publicKey, signature, 'base64');
};
