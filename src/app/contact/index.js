'use strict';

const express = require('express');
const logger = require('./../../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const getContactForm = require('./getContactForm');
const postContactForm = require('./postContactForm');
const getConfirm = require('./getConfirm');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  router.get('/', csrf, asyncWrapper(getContactForm);
  router.post('/', csrf, asyncWrapper(postContactForm));

  router.get('/confirm', csrf, asyncWrapper(getConfirm));

  return router;
};

module.exports = routes;