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
const getAccessService = require('./getAccessService');
const getCreateAccountHelp = require('./getCreateAccountHelp');

const getAddOrganisationHelp = require('./getAddOrganisationHelp');
const getCourseDirectoryHelp = require('./getCourseDirectoryHelp');

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {

  router.get('/', csrf, asyncWrapper(getHelp));
  router.post('/', csrf, asyncWrapper(postHelp));

  router.get('/submit', csrf, asyncWrapper(getContactForm));
  router.post('/submit', csrf, asyncWrapper(postContactForm));

  router.get('/confirm', csrf, asyncWrapper(getConfirm));

  router.get('/email-password', csrf, asyncWrapper(getEmailPasswordHelp));

  router.get('/verification-email', csrf, asyncWrapper(getVerificationEmailHelp));

  router.get('/create-account', csrf, asyncWrapper(getCreateAccountHelp));

  router.get('/approver', csrf, asyncWrapper(getApproverHelp));
  router.get('/approver/new-approver', csrf, asyncWrapper(getNewApprover));

  router.get('/service', csrf, asyncWrapper(getSelectService));
  router.post('/service', csrf, asyncWrapper(postSelectService));

  router.get('/service/:sid', csrf, asyncWrapper(getServiceHelp));
  router.post('/service/:sid', csrf, asyncWrapper(postServiceHelp));
  router.get('/service/:sid/verification-email', csrf, asyncWrapper(getVerificationEmailHelp));
  router.get('/service/:sid/access-service', csrf, asyncWrapper(getAccessService));
  router.get('/service/:sid/create-account', csrf, asyncWrapper(getCreateAccountHelp));

  router.get('/add-org', csrf, asyncWrapper(getAddOrganisationHelp));
  router.get('/course-directory', csrf, asyncWrapper(getCourseDirectoryHelp));

  return router;
};

module.exports = routes;
