'use strict';

const config = require('./../config');
const { getOrganisationAndServiceForUserV2, getAllRequestsForApprover } = require('./../organisations');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() || req.originalUrl.startsWith('/signout?redirected=true')) {
    res.locals.isLoggedIn = true;
    return next();
  }
  req.session.redirectUrl = req.originalUrl;
  return res.status(302).redirect('/auth');
};

const isApprover = (req, res, next) => {
  if (req.userOrganisations) {
    const userApproverOrgs = req.userOrganisations.filter((x) => x.role.id === 10000);
    if (userApproverOrgs.find((x) => x.organisation.id.toLowerCase() === req.params.orgId.toLowerCase())) {
      return next();
    }
  }
  return res.status(401).render('errors/views/notAuthorised');
};

const getUserEmail = (user) => user.email || '';

const getUserDisplayName = (user) => `${user.given_name || ''} ${user.family_name || ''}`.trim();

const setUserContext = async (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
    res.locals.displayName = getUserDisplayName(req.user);
    const organisations = await getOrganisationAndServiceForUserV2(req.user.sub, req.id);
    req.userOrganisations = organisations;
    try {
      if (req.userOrganisations) {
        res.locals.isApprover = req.userOrganisations.filter((x) => x.role.id === 10000).length > 0;
      }
      if (res.locals.isApprover) {
        const approverOrgRequests = await getAllRequestsForApprover(req.user.sub, req.id);
        req.organisationRequests = approverOrgRequests;
      }
    } catch (e) {
      return e;
    }
  }
  next();
};

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  isLoggedIn,
  getUserEmail,
  getUserDisplayName,
  setUserContext,
  asyncMiddleware,
  isApprover,
};