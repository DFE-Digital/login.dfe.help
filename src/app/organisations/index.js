'use strict';

const express = require('express');
// const logger = require('./../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getOrganisations } = require('./organisations');
const { get: getOrganisationAccessMeaning } = require('./organisationAccessMeaning');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getOrganisations));
  router.get('/organisation-access-meaning', csrf, asyncWrapper(getOrganisationAccessMeaning));

  return router;
};

module.exports = routes;
