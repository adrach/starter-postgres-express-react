const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const dbConfig = require('../config/db.js');
const apiPosts = require('./routes/api/posts');

module.exports = async () => {
  const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const db = await dbConfig();
  app.set('db', db.db);
  app.set('dbSrc', db.dbSrc);

  app.use(express.static(path.join(__dirname, '../build')));

  app.use('/api', apiPosts(app));

  /*
  app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/app/dist/index.html'));
  });
  */

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res) => {
    // send the error response
    res.status(err.status || 500);
    if (err.status === 401) res.send('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/auth"></head></html>');
    else res.send(err.message);
  });

  return app;
};
