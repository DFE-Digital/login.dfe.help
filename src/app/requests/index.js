const express = require("express");
const { asyncWrapper } = require("login.dfe.express-error-handling");

const { get: getRequests } = require("./requests");
const { get: getHowToReject } = require("./howToReject");
const { get: getHowToApprove } = require("./howToApprove");
const {
  get: getCanEndUserRequestService,
} = require("./canEndUserRequestService");

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  router.get("/", csrf, asyncWrapper(getRequests));
  router.get("/how-to-reject", csrf, asyncWrapper(getHowToReject));
  router.get("/how-to-approve", csrf, asyncWrapper(getHowToApprove));
  router.get(
    "/can-end-user-request-service",
    csrf,
    asyncWrapper(getCanEndUserRequestService),
  );

  return router;
};

module.exports = routes;
