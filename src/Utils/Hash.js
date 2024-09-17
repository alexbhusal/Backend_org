const bcrypt = require('bcrypt');

async function Hash(payload) {
  return await bcrypt.hash(payload, 10);
}

async function compareHash(string, hash) {
  return await bcrypt.compare(string, hash);
}

module.exports = { Hash, compareHash };
