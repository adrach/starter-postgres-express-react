#!/usr/bin/env node
const migrate = require('node-pg-migrate');
const { connectionStr, schema } = require('../config/db');

const databaseUrl = connectionStr;
const direction = 'up';
const dir = './migrations';
const migrationsTable = 'migrations';
const migrationsSchema = schema;

// Execute the migrations
migrate.default({
  databaseUrl,
  migrationsTable,
  migrationsSchema,
  schema,
  direction,
  dir
});
