const massive = require('massive');
const { connectionStr, schema } = require('../config/db');

module.exports = async () => {
  // connect to Massive and get the db instance
  const db = await massive(connectionStr, {
    // explicitly specify the used schemas
    allowedSchemas: [schema]
  });

  return { db };
};
