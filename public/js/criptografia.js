const crypto = require('crypto');

const hashPassword = (password, salt) => {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
}

const randomSalt = () => {
    return crypto.randomBytes(16).toString('hex');
}

module.exports = {hashPassword,randomSalt};
