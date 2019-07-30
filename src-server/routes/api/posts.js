const Router = require('express-promise-router');
const _ = require('lodash');
const Posts = require('../../components/posts');
const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const posts = Posts(app);

  // Create
  router.post('/', auth.authenticate, async (req, res) => {
    const data = await posts.create(req.user, _.pick(req.body, 'content', 'title'));
    res.json(data);
  });

  // Get all
  router.get('/', auth.authenticate, async (req, res) => {
    const data = await posts.get();
    res.json(data);
  });

  // Get one
  router.get('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.getOne(req.params.id);
    res.json(data);
  });

  // Update
  router.put('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.update(req.params.id, _.pick(req.body, 'content', 'title'));
    res.json(data);
  });

  // Delete
  router.delete('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.delete(req.params.id);
    res.json(data);
  });

  return Router().use('/posts', router);
};
