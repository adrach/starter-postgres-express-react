const Router = require('express-promise-router');
const passport = require('passport');
const _ = require('lodash');
const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const users = require('../../components/users')(app);

  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (err1, user) => {
      if (err1 || !user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      req.logIn(user, { session: false }, (err2) => {
        if (err2) {
          res.send(err2);
        } else {
          const token = auth.signUser(user);
          res.json({ user, token });
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
    return res.json({ user, token });
  });

  router.get('/me', auth.authenticate, (req, res) => res.json(req.user));

  return router;
};
