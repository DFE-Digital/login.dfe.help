'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getMigration } = require('./movingToDfESignIn');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getMigration));

  return router;
};

module.exports = routes;
