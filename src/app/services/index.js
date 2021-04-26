'use strict';

const express = require('express');
// const logger = require('./../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getServices } = require('./services');
const { get: getDoINeedAccess } = require('./doINeedAccess');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getServices));
  router.get('/do-I-need-access', csrf, asyncWrapper(getDoINeedAccess));

  return router;
};

module.exports = routes;
