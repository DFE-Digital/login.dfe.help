'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');
const { get: getManageDashboard } = require('../dashboard/managDashboard');
const { get: gethowtoEditServiceConfig } = require('./howtoEditServiceConfig');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  router.get('/:sid', csrf, asyncWrapper(getManageDashboard));
  router.get('/:sid/how-to-edit-service-config', csrf, asyncWrapper(gethowtoEditServiceConfig));

  return router;
};

module.exports = routes;
