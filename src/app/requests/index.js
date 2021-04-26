'use strict';

const express = require('express');
// const logger = require('./../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getRequests } = require('./requests');
const { get: getAccessToServices } = require('../requests/accessToServices');
const { get: getHowToReject } = require('../requests/howToReject');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getRequests));
  router.get('/access-to-services', csrf, asyncWrapper(getAccessToServices));
  router.get('/how-to-reject', csrf, asyncWrapper(getHowToReject));

  // add all other routes to new pages here

  return router;
};

module.exports = routes;
