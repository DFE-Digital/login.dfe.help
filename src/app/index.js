'use strict';

const express = require('express');
const logger = require('./../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getDashboard } = require('./dashboard');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getDashboard));

  // add all other routes to new pages here

  return router;
};

module.exports = routes;
