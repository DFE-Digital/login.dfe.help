'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');
const { get: getPageComingSoon } = require('./pageComingSoon');


const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  router.get('/', csrf, asyncWrapper(getPageComingSoon));
  router.get('/:sid/page-coming-soon', csrf, asyncWrapper(getPageComingSoon));
 

  return router;
};

module.exports = routes;