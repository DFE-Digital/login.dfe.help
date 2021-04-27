'use strict';

const express = require('express');
// const logger = require('./../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getRequests } = require('./requests');
const { get: getAccessToServices } = require('../requests/accessToServices');
const { get: getHowToReject } = require('../requests/howToReject');
const { get: getHowToApprove } = require('../requests/howToApprove');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getRequests));
  router.get('/access-to-services', csrf, asyncWrapper(getAccessToServices));
  router.get('/how-to-reject', csrf, asyncWrapper(getHowToReject));
  router.get('/how-to-approve', csrf, asyncWrapper(getHowToApprove));

  return router;
};

module.exports = routes;
