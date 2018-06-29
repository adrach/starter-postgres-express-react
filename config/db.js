// TODO: move the credentials into .env
let connectionStr = '';
if (process.env.NODE_ENV === 'test') {
  connectionStr = 'postgres://303:pass123!@www.solwey.com/303-test?ssl=true';
} else {
  connectionStr = 'postgres://303:pass123!@www.solwey.com/303-dev?ssl=true';
}
const schema = 'public';

module.exports = {
  connectionStr,
  schema
};
