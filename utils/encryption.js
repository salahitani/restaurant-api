const crypto = require('crypto');

class EncyprtionUtils {

  encryptPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
  };

  getHashedPassword = (password, salt) => {
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash;
  };

}


module.exports = EncyprtionUtils;
