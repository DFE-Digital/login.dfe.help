'use strict';

const express = require('express');
// const logger = require('./../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getProfile } = require('./profile');
const { get: getSetupAccount } = require('./setupAccount');
const { get: getChangePassword } = require('./changePassword');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getProfile));
  router.get('/setup-account', csrf, asyncWrapper(getSetupAccount));
  router.get('/change-password', csrf, asyncWrapper(getChangePassword));

  // add all other routes to new pages here

  return router;
};

module.exports = routes;
