"use strict";

const express = require("express");
const { asyncWrapper } = require("login.dfe.express-error-handling");

const { get: getEndUsers } = require("./endUsers");
const { get: getWhatIsEndUser } = require("./whatIsEndUser");

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  router.get("/", csrf, asyncWrapper(getEndUsers));
  router.get("/what-is-end-user", csrf, asyncWrapper(getWhatIsEndUser));

  return router;
};

module.exports = routes;
