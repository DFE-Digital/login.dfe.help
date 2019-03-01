'use strict';

const express = require('express');
const logger = require('./../../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const getFaqs = require('./getFaqs');
const getContactForm = require('./getContactForm');
const postContactForm = require('./postContactForm');
const getConfirm = require('./getConfirm');
const { get: getSelectService, post: postSelectService } = require('./selectService');
const { get: getServiceHelp } = require('./serviceHelp');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getFaqs));

  router.get('/form', csrf, asyncWrapper(getContactForm));
  router.post('/form', csrf, asyncWrapper(postContactForm));

  router.get('/confirm', csrf, asyncWrapper(getConfirm));

  router.get('/service', csrf, asyncWrapper(getSelectService));
  router.post('/service', csrf, asyncWrapper(postSelectService));

  router.get('/service/:sid', csrf, asyncWrapper(getServiceHelp));
  router.post('/service/:sid', csrf, asyncWrapper());

  return router;
};

module.exports = routes;
