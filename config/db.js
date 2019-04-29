const hostWithPort = `${process.env.DB_HOST}${process.env.DB_PORT ? `:${process.env.DB_PORT}` : ''}`;
let connectionStr = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${hostWithPort}/${process.env.DB_NAME}`;
if (process.env.DB_ENABLE_SSL) connectionStr += '?ssl=true';

const schema = 'public';

module.exports = {
  connectionStr,
  schema
};
