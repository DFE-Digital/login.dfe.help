const SimpleSchema = require('simpl-schema').default;
const { validateConfigAgainstSchema, schemas, patterns } = require('login.dfe.config.schema.common');
const config = require('./index');
const logger = require('./../logger');

const notificationsSchema = new SimpleSchema({
  connectionString: patterns.redis,
});

const identifyingPartySchema = new SimpleSchema({
  url: patterns.url,
  clientId: String,
  clientSecret: String,
  clockTolerance: SimpleSchema.Integer,
});

const accessIdentifiers = new SimpleSchema({
  identifiers: {
    type: Object,
  },
  'identifiers.service': patterns.uuid,
  'identifiers.organisation': patterns.uuid,
});

const hostingEnvironmentSchema = new SimpleSchema({
  csrfSecret: {
    type: String,
    optional: true,
  },
});

accessIdentifiers.extend(schemas.apiClient);

const adapterSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['file', 'redis', 'mongo', 'azuread', 'sequelize'],
  },
  directories: {
    type: schemas.sequelizeConnection,
    optional: true,
  },
  organisation: {
    type: schemas.sequelizeConnection,
    optional: true,
  },
});

const schema = new SimpleSchema({
  loggerSettings: schemas.loggerSettings,
  hostingEnvironment: schemas.hostingEnvironment.extend(hostingEnvironmentSchema),
  applications: schemas.apiClient,
  access: accessIdentifiers,
  notifications: notificationsSchema,
  assets: schemas.assets,
  identifyingParty: identifyingPartySchema,
  organisations: schemas.apiClient,
  adapter: adapterSchema,
});

module.exports.validate = () => {
  validateConfigAgainstSchema(config, schema, logger);
};
