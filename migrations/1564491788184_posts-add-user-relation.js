exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumn('posts', 'author');
  pgm.addColumns('posts', {
    user_id: {
      type: 'integer'
    }
  });
};

exports.down = () => {

};
