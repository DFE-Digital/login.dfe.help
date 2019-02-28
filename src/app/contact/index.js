'use strict';

const express = require('express');
const logger = require('./../../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const getFaqs = require('./getFaqs');
const getContactForm = require('./getContactForm');
const postContactForm = require('./postContactForm');
const getConfirm = require('./getConfirm');
const { get: getSelectService } = require('./selectService');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getFaqs));

  router.get('/form', csrf, asyncWrapper(getContactForm));
  router.post('/form', csrf, asyncWrapper(postContactForm));

  router.get('/confirm', csrf, asyncWrapper(getConfirm));

  router.get('/select-service', csrf, asyncWrapper(getSelectService));

  return router;
};

module.exports = routes;
