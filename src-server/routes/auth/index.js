const Router = require('express-promise-router');
const passport = require('passport');
const _ = require('lodash');
const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const users = require('../../components/users')(app);

  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.logIn(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        } else {
          const token = auth.signUser(user);
          return res.json({user, token});
        }
      });
    })(req, res);
  });

  router.post('/register', async (req, res) => {
    const params = _.pick(req.body, 'email', 'firstName', 'lastName', 'password');
    params.password = auth.createHash(params.password);
    console.log(params);

    const user = await users.create(params);
    const token = auth.signUser(user);
    return res.json({user, token});
  });

  router.get('/me', auth.authenticate, (req, res) => {
    return res.json(req.user);
  });

  return router;
};
