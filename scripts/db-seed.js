#!/usr/bin/env node
const faker = require('faker');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('../config/env');

const DB = require('../src-server/db');
const auth = require('../src-server/components/auth/helpers');

const tablePosts = 'posts';
const tableUsers = 'users';

const createRecordPost = (db, table, id) => {
  console.log('Inserting record #', id, '...');
  return db[table].insert({
    title: faker.commerce.product(),
    author: faker.internet.userName(),
    content: faker.lorem.text()
  });
};

function openDB() {
  console.log('Connecting to the DB...');
  return DB();
}

function seedPosts(db) {
  // Seed with fake data
  console.log('Seeding [posts]...');
  const records = [];
  try {
    for (let i = 1; i <= 10; i += 1) records.push(createRecordPost(db, tablePosts, i));
  } catch (e) {
    console.error(e);
  }

  return Promise.all(records);
}

function seedUsers(db) {
  console.log('Seeding [users]...');
  const users = [{
    email: 'user@test.com',
    password: auth.createHash('password'),
    firstName: 'Test',
    lastName: 'User'
  }];

  return db[tableUsers].insert(users);
}

function seed(db) {
  // Run seeding functions
  return seedPosts(db)
    .then(() => seedUsers(db))
    .then(() => {
      console.log('Successfully completed the seeding process');
    });
}

function clearDB(db) {
  if (process.env.NODE_ENV !== 'test') throw new Error('ClearDB can only be run on TEST DB!!!');

  // Clear [posts] and restart the sequence
  return db[tablePosts].destroy({})
    .then(() => db.query('ALTER SEQUENCE posts_id_seq RESTART WITH 1'))
    .then(() => db[tableUsers].destroy({}))
    .then(() => db.query('ALTER SEQUENCE users_id_seq RESTART WITH 1'))
    .then(() => {
      console.log('Successfully cleared the DB');
    });
}

function closeDB(db) {
  return db.instance.$pool.end();
}

if (require.main === module) {
  openDB().then(db => seed(db.db));
} else {
  module.exports = {
    openDB, seed, clearDB, closeDB
  };
}
