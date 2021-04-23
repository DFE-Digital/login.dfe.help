'use strict';

const express = require('express');
// const logger = require('./../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getProfile } = require('./profile');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getProfile));

  // add all other routes to new pages here

  return router;
};

module.exports = routes;
