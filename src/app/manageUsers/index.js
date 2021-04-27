'use strict';

const express = require('express');
// const logger = require('./../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getManageUsers } = require('./manageUsers');
const { get: getHowToManageUsers } = require('./howToManageUsers');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getManageUsers));
  router.get('/how-to-manage-users', csrf, asyncWrapper(getHowToManageUsers));

  // add all other routes to new pages here

  return router;
};

module.exports = routes;
