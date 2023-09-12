'use strict';
const { getOrganisationAndServiceForUserV2, getAllRequestsForApprover } = require('./../organisations');const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const isLoggedIn = (req, res, next) => {
  // if user is authenticated, set local value to show navigation menu
  if (req.isAuthenticated()) {
    res.locals.isLoggedIn = true;
  }
  return next();
};
const authenticate = (req, res, next) => {
  // if user not authenticated, redirect to authentication
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    return res.status(302).redirect('/auth');
  }
  // if user authenticated, continue
  return next();
};
const expressAppWithViews = (viewPath) => {
  const app = express();
  app.use(expressLayouts);
  app.set('view engine', 'ejs');
  app.set('views', viewPath);
  app.set('layout', 'layouts/layout');
  return app;
};

const expressAuthenticationStub = (authenticated, extras) => (req, res, next) => {
  req.isAuthenticated = () => authenticated;
  req.user = {};
  Object.assign(req, extras);

  if (!res.locals) {
    res.locals = {};
  }
  res.locals.flash = {};
  res.locals.profilesUrl = '';

  next();
};
const setUserContext = async (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
    const organisations = await getOrganisationAndServiceForUserV2(req.user.sub, req.id);
    req.userOrganisations = organisations;
    try {
      if (req.userOrganisations) {
        res.locals.isApprover = req.userOrganisations.filter((x) => x.role.id === 10000).length > 0;
      }
      if (res.locals.isApprover) {
        const approverOrgRequests = await getAllRequestsForApprover(req.user.sub, req.id);
        req.organisationRequests = approverOrgRequests;
        res.locals.approverRequests = approverOrgRequests;
      }
    } catch (e) {
      return e;
    }
  }
  next();
};
module.exports = {
  expressAppWithViews,
  expressAuthenticationStub,
  isLoggedIn,
  authenticate,
  setUserContext,
};
