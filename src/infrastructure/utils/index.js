'use strict';

const { getOrganisationAndServiceForUserV2, getAllRequestsForApprover } = require('./../organisations');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.isLoggedIn = true;
    return next();
  }
  req.session.redirectUrl = req.originalUrl;
  return res.status(302).redirect('/auth');
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
      }
    } catch (e) {
      return e;
    }
  }
  next();
};

module.exports = {
  isLoggedIn,
  setUserContext,
};
