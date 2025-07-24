const express = require("express");
const { asyncWrapper } = require("login.dfe.express-helpers/error-handling");

const { get: getDashboard } = require("./dashboard");

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  router.get("/", csrf, asyncWrapper(getDashboard));

  return router;
};

module.exports = routes;
