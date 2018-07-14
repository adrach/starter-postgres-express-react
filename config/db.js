// TODO: move the credentials into .env
let connectionStr = '';
if (process.env.NODE_ENV === 'test') {
  connectionStr = 'postgres://user:password!@www.solwey.com/db-test?ssl=true';
} else {
  connectionStr = 'postgres://user:password!@www.solwey.com/db-dev?ssl=true';
}
const schema = 'public';

module.exports = {
  connectionStr,
  schema
};
