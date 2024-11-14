"use strict";

const express = require("express");
const { asyncWrapper } = require("login.dfe.express-error-handling");

const { get: getContactUs } = require("./getContactUs");
const { post: postContactUs } = require("./postContactUs");
const { get: getContactUsCompleted } = require("./getContactUsCompleted");

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  router.get("/", csrf, asyncWrapper(getContactUs));
  router.post("/", csrf, asyncWrapper(postContactUs));
  router.get("/completed", csrf, asyncWrapper(getContactUsCompleted));

  return router;
};

module.exports = routes;
