#!/usr/bin/env node
const server = require('./start-server');

process.env.PORT = 3000;
process.env.NODE_END = 'production';
server();
