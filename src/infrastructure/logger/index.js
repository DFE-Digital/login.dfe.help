const AuditTransporter = require("login.dfe.audit.transporter");
const {
  setupApplicationInsights,
  setupLogging,
} = require("login.dfe.api-client/logging");
const config = require("../config");

const additionalTransports = [];
const applicationName = config.loggerSettings.applicationName || "Help";

additionalTransports.push(
  AuditTransporter({
    application: applicationName,
    level: "audit",
  }),
);

if (config.hostingEnvironment.applicationInsights) {
  setupApplicationInsights(config.hostingEnvironment.applicationInsights);
}

module.exports = setupLogging({
  applicationName: applicationName,
  logLevel: process.env.LOG_LEVEL,
  additionalTransports,
});
