'use strict';

const express = require('express');
const logger = require('../../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const signOutUser = require('./signOut');
const complete = require('./complete');

const router = express.Router({ mergeParams: true });

const signout = () => {
  logger.info('Mounting signOut route');
  router.get('/', asyncWrapper(signOutUser));
  // TODO Check if we really need this other route?
  router.get('/complete', asyncWrapper(complete));
  return router;
};

module.exports = signout;
