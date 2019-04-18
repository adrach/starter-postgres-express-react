const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secrets = require('../../../config/secrets');

function createHash(password, salt) {
  const s = salt || crypto.randomBytes(4).toString('hex');
  const hmac = crypto.createHmac('sha256', s);
  return s + hmac.update(password).digest('hex');
}

function checkPassword(plain, hashed) {
  const salt = hashed.slice(0, 8);
  return createHash(plain, salt) === hashed;
}

function signUser(user) {
  return jwt.sign({
    id: user.id,
    email: user.email
  }, secrets.jwt);
}

function authenticate(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.logIn(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      } else {
        next();
      }
    });
  })(req, res)
}

module.exports = {
  createHash, checkPassword, signUser, authenticate
};
