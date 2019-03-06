'use strict';

const express = require('express');
const logger = require('./../../infrastructure/logger');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const getFaqs = require('./getFaqs');
const getContactForm = require('./getContactForm');
const postContactForm = require('./postContactForm');
const getConfirm = require('./getConfirm');
const { get: getSelectService, post: postSelectService } = require('./selectService');
const { get: getServiceHelp, post: postServiceHelp } = require('./serviceHelp');
const { get: getHelp, post: postHelp} = require('./help');
const getEmailPasswordHelp = require('./getEmailPasswordhelp');
const getApproverHelp = require('./getApproverHelp');
const getVerificationEmailHelp = require('./getVerificationEmailHelp');
const getNewApprover = require('./getNewApprover');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getHelp));
  router.post('/', csrf, asyncWrapper(postHelp));

  router.get('/form', csrf, asyncWrapper(getContactForm));
  router.post('/form', csrf, asyncWrapper(postContactForm));

  router.get('/confirm', csrf, asyncWrapper(getConfirm));

  router.get('/email-password', csrf, asyncWrapper(getEmailPasswordHelp));

  router.get('/verification-email', csrf, asyncWrapper(getVerificationEmailHelp));

  router.get('/approver', csrf, asyncWrapper(getApproverHelp));
  router.get('/approver/new-approver', csrf, asyncWrapper(getNewApprover));

  router.get('/service', csrf, asyncWrapper(getSelectService));
  router.post('/service', csrf, asyncWrapper(postSelectService));

  router.get('/service/:sid', csrf, asyncWrapper(getServiceHelp));
  router.post('/service/:sid', csrf, asyncWrapper(postServiceHelp));

  return router;
};

module.exports = routes;
