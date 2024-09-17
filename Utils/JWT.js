const jwt = require('jsonwebtoken');

function createJWTtoken(payload) {
  const token = jwt.sign(payload, 'TEST', { expiresIn: '30d' });
  return token;
}

function verifyJWTtoken(token) {
  const decoded = jwt.verify(token, 'TEST');
  return decoded;
}

module.exports = {
  createJWTtoken,
  verifyJWTtoken,
};
