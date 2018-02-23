'use strict';

const express = require('express');
const logger = require('./../../infrastructure/logger');

const getContactForm = require('./getContactForm');
const postContactForm = require('./postContactForm');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  router.get('/', csrf, getContactForm);
  router.post('/', csrf, postContactForm);

  return router;
};

module.exports = routes;