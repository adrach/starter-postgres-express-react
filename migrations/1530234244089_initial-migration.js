exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('posts', {
    id: 'id',
    title: {
      type: 'text',
      notNull: true
    },
    author: {
      type: 'text',
      notNull: true
    },
    content: {
      type: 'text',
      notNull: true
    }
  });
  pgm.createIndex('posts', 'author');
};

exports.down = (pgm) => {

};
