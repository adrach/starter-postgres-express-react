const request = require('supertest');
const migrate = require('../scripts/db-migrate');
const seed = require('../scripts/db-seed');

const App = require('./app');

describe('Run basic server tests', () => {
  var app = {};

  // Run migrations, clear DB, then seeding
  beforeAll(async () => {
    await migrate();
    const { db } = await seed.openDB();
    await seed.clearDB(db);
    await seed.seed(db);
    await seed.closeDB(db);
  }, 30000);

  // Wait for the app to load
  beforeAll(async () => {
    app = await App();
  }, 30000);

  it('should have a successful DB connection', () => {
    const db = app.get('db');
    return expect(typeof db).toBe('object');
  });

  it('should respond 200 to the [GET /]', () => {
    return request(app).get('/').expect(200);
  });
});
