'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getServices } = require('./services');
const { get: getRequestAccess } = require('./requestAccess');
const { get: getDoINeedAccess } = require('./doINeedAccess');
const { get: getHavingTrouble } = require('./havingTrouble');
const { get: getHowToAdd } = require('./howToAdd');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getServices));
  router.get('/request-access', csrf, asyncWrapper(getRequestAccess));
  router.get('/do-I-need-access', csrf, asyncWrapper(getDoINeedAccess));
  router.get('/having-trouble', csrf, asyncWrapper(getHavingTrouble));
  router.get('/how-to-add', csrf, asyncWrapper(getHowToAdd));

  return router;
};

module.exports = routes;
