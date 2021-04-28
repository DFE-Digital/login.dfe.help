'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const { get: getOrganisations } = require('./organisations');
const { get: getOrganisationAccessMeaning } = require('./organisationAccessMeaning');
const { get: getAddMultipleOrganisations } = require('./addMultipleOrganisations');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getOrganisations));
  router.get('/organisation-access-meaning', csrf, asyncWrapper(getOrganisationAccessMeaning));
  router.get('/add-multiple-organisations', csrf, asyncWrapper(getAddMultipleOrganisations));

  return router;
};

module.exports = routes;
