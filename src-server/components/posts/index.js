module.exports = (app) => {
  const db = app.get('db');
  const { posts } = db;
  const module = {};

  // Create
  module.create = async (row) => {
    if (!row) throw new Error('No row data given');
    delete row.id;
    return posts.save(row);
  };

  // Get all
  module.get = async () => posts.find();

  // Get one
  module.getOne = async id => posts.findOne({ id });

  // Update
  module.update = async (id, row) => {
    if (!Number(id)) throw new Error('No id given');
    row.id = id;
    return posts.save(row);
  };

  // Delete
  module.delete = async (id) => {
    if (!Number(id)) throw new Error('No id given');
    return posts.destroy({ id });
  };

  return module;
};
