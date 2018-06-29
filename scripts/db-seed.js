#!/usr/bin/env node
const faker = require('faker');
const DB = require('../src-server/db')();

const tablePosts = 'posts';

const createRecordPost = (db, table, id) => {
  console.log('Inserting record #', id, '...');
  return db[table].insert({
    title: faker.commerce.product(),
    author: faker.internet.userName(),
    content: faker.lorem.text()
  });
};

async function seedPosts() {
  console.log('Connecting to the DB...');
  const { db } = await DB;

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

// Run seeding functions
seedPosts()
  .then(() => {
    console.log('Successfully completed the seeding process');
  });
