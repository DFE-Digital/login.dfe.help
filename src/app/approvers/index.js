'use strict';

const express = require('express');
// const logger = require('./../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getApprovers } = require('./approvers');
const { get: getMakeSomeoneApprover } = require('./makeSomeoneApprover');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getApprovers));
  router.get('/make-someone-approver', csrf, asyncWrapper(getMakeSomeoneApprover));

  // add all other routes to new pages here

  return router;
};

module.exports = routes;
