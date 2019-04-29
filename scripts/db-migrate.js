#!/usr/bin/env node
const migrate = require('node-pg-migrate');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('../config/env');

const { connectionStr, schema } = require('../config/db');

const databaseUrl = connectionStr;
const direction = 'up';
const dir = './migrations';
const migrationsTable = 'migrations';
const migrationsSchema = schema;

function main() {
  // Execute the migrations
  console.log("Running the migrations...");
  return migrate.default({
    databaseUrl,
    migrationsTable,
    migrationsSchema,
    schema,
    direction,
    dir
  });
}


if (require.main === module) {
  main();
} else {
  module.exports = main;
}
