'use strict';

const express = require('express');
// const logger = require('./../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getContactUs } = require('./getContactUs');
const { post: postContactUs } = require('./postContactUs');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getContactUs));
  router.post('/', csrf, asyncWrapper(postContactUs));

  return router;
};

module.exports = routes;
