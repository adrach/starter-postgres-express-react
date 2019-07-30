const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const _ = require('lodash');
const secrets = require('../../../config/secrets');

module.exports = (app) => {
  const users = require('../users')(app);
  return new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secrets.jwt
  },
  async (jwtPayload, cb) => {
    try {
      const user = await users.getOne(jwtPayload.id);
      cb(null, _.omit(user, 'password'));
    } catch (err) {
      cb(err);
    }
  });
};
