"use strict";

const express = require("express");
const { asyncWrapper } = require("login.dfe.express-error-handling");

const { get: getProfile } = require("./profile");
const { get: getSetupAccount } = require("./setupAccount");
const { get: getChangePassword } = require("./changePassword");
const { get: getChangeEmail } = require("./changeEmail");

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  router.get("/", csrf, asyncWrapper(getProfile));
  router.get("/setup-account", csrf, asyncWrapper(getSetupAccount));
  router.get("/change-password", csrf, asyncWrapper(getChangePassword));
  router.get("/change-email", csrf, asyncWrapper(getChangeEmail));

  return router;
};

module.exports = routes;
