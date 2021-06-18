'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getManageUsers } = require('./manageUsers');
const { get: getHowToManageUsers } = require('./howToManageUsers');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getManageUsers));
  router.get('/how-to-manage-users', csrf, asyncWrapper(getHowToManageUsers));

  return router;
};

module.exports = routes;
