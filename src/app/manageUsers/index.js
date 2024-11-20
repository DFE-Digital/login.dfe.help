const express = require("express");
const { asyncWrapper } = require("login.dfe.express-error-handling");

const { get: getManageUsers } = require("./manageUsers");
const { get: getHowToManageUsers } = require("./howToManageUsers");
const { get: getAddSubServiceToUser } = require("./addSubServiceToUser");
const { get: getChangeSubServiceToUser } = require("./changeSubServiceToUser");

const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  router.get("/", csrf, asyncWrapper(getManageUsers));
  router.get("/how-to-manage-users", csrf, asyncWrapper(getHowToManageUsers));
  router.get(
    "/add-sub-service-to-user",
    csrf,
    asyncWrapper(getAddSubServiceToUser),
  );
  router.get(
    "/change-sub-service-to-user",
    csrf,
    asyncWrapper(getChangeSubServiceToUser),
  );

  return router;
};

module.exports = routes;
