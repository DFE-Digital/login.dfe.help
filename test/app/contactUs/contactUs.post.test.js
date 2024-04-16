// Disabled global require for config/logger mocks to ensure the mock factory can be used.
/* eslint-disable global-require */
jest.mock('./../../../src/infrastructure/config', () => require('../../utils').configMockFactory({
  loggerSettings: {
    applicationName: 'help',
  },
  hostingEnvironment: {
    env: 'dev',
  },
}));
jest.mock('./../../../src/infrastructure/logger', () => require('../../utils').loggerMockFactory());
/* eslint-enable global-require */
jest.mock('./../../../src/infrastructure/applications', () => ({
  listAllServices: jest.fn(),
}));
jest.mock('login.dfe.notifications.client');

const NotificationClient = require('login.dfe.notifications.client');
const { post: postContactForm } = require('../../../src/app/contactUs/postContactUs');
const logger = require('../../../src/infrastructure/logger');
const { listAllServices } = require('../../../src/infrastructure/applications');
const { getRequestMock, getResponseMock } = require('../../utils');

const sendSupportRequest = jest.fn();
const sendSupportRequestConfirmation = jest.fn();

const createString = (length) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let str = '';
  for (let i = 0; i < length; i += 1) {
    str += charset[Math.floor(Math.random() * charset.length)];
  }
  return str;
};

const mockServicesInput = [
  {
    id: 'service1',
    name: 'analyse school performance',
    isExternalService: true,
  },
  {
    id: 'service2',
    name: 'test service',
    isExternalService: true,
  },
];

const mockServicesOutput = [
  {
    id: 'service1',
    name: 'analyse school performance',
  },
  {
    id: 'service2',
    name: 'test service',
  },
];

describe('When handling post of contact form', () => {
  let req;
  const res = getResponseMock();

  beforeEach(() => {
    req = getRequestMock({
      csrfToken: () => 'csrf-token',
      body: {
        name: 'User One',
        email: 'user.one@unit.test',
        message: 'Please help me',
        orgName: 'Organisation name',
        urn: '123456',
        service: 'test service',
        type: 'test type',
        typeOtherMessage: '',
        phoneNumber: '',
        password: '',
      },
      session: {},
      query: {},
    });
    res.mockResetAll();

    sendSupportRequest.mockReset();
    sendSupportRequestConfirmation.mockReset();
    NotificationClient.mockReset();
    NotificationClient.mockImplementation(() => ({
      sendSupportRequest,
      sendSupportRequestConfirmation,
    }));

    logger.mockResetAll();

    listAllServices.mockReset().mockReturnValue({
      services: mockServicesInput,
    });
  });

  it('should create NotificationClient with config connection string', async () => {
    await postContactForm(req, res);

    expect(NotificationClient.mock.calls).toHaveLength(1);
    expect(NotificationClient.mock.calls[0][0]).toEqual({
      connectionString: 'test',
    });
  });

  it('should send support request job with form details', async () => {
    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(sendSupportRequest.mock.calls[0][0]).toBe(req.body.name);
    expect(sendSupportRequest.mock.calls[0][1]).toBe(req.body.email);
    expect(sendSupportRequest.mock.calls[0][2]).toBe(req.body.service);
    expect(sendSupportRequest.mock.calls[0][3]).toBe(req.body.type);
    expect(sendSupportRequest.mock.calls[0][4]).toBe(req.body.typeOtherMessage);
    expect(sendSupportRequest.mock.calls[0][5]).toBe(req.body.orgName);
    expect(sendSupportRequest.mock.calls[0][6]).toBe(req.body.urn);
    expect(sendSupportRequest.mock.calls[0][7]).toBe(req.body.message);
  });

  it('should redirect to contact form complete page', async () => {
    await postContactForm(req, res);

    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should redirect to contact form complete page with redirect URI if provided in query', async () => {
    req.query.redirect_uri = 'test_redirect';

    await postContactForm(req, res);

    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed?redirect_uri=test_redirect');
  });

  it('should render error view if name is missing', async () => {
    req.body.name = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      orgName: req.body.orgName,
      message: req.body.message,
      referrer: '/dashboard',
      service: 'test service',
      services: mockServicesOutput,
      title: 'DfE Sign-in',
      type: 'test type',
      typeOtherMessage: '',
      urn: req.body.urn,
      backLink: true,
      isHidden: true,
      isHomeTopHidden: true,
      validationMessages: {
        name: 'Enter your name',
      },
    });
  });

  it('should render error view if email is missing', async () => {
    req.body.email = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      orgName: req.body.orgName,
      message: req.body.message,
      referrer: '/dashboard',
      service: 'test service',
      services: mockServicesOutput,
      title: 'DfE Sign-in',
      type: 'test type',
      typeOtherMessage: '',
      urn: req.body.urn,
      backLink: true,
      isHidden: true,
      isHomeTopHidden: true,
      validationMessages: {
        email: 'Enter your email address',
      },
    });
  });

  it('should render error view if email is invalid', async () => {
    req.body.email = 'invalid@email';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      orgName: req.body.orgName,
      message: req.body.message,
      referrer: '/dashboard',
      service: 'test service',
      services: mockServicesOutput,
      title: 'DfE Sign-in',
      type: 'test type',
      typeOtherMessage: '',
      urn: req.body.urn,
      backLink: true,
      isHidden: true,
      isHomeTopHidden: true,
      validationMessages: {
        email: 'Enter a valid email address',
      },
    });
  });

  it('should render error view if organisation name is missing', async () => {
    req.body.orgName = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      orgName: req.body.orgName,
      message: req.body.message,
      referrer: '/dashboard',
      service: 'test service',
      services: mockServicesOutput,
      title: 'DfE Sign-in',
      type: 'test type',
      typeOtherMessage: '',
      urn: req.body.urn,
      backLink: true,
      isHidden: true,
      isHomeTopHidden: true,
      validationMessages: {
        orgName: 'Enter your organisation name',
      },
    });
  });

  it('should render error view if urn is set and not a string', async () => {
    req.body.urn = ['test', '123'];

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      urn: 'Enter a valid URN or UKPRN, if known',
    });
  });

  it('should render error view if urn is set and not in the URN/UKPRN format', async () => {
    req.body.urn = 'abcd';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      urn: 'Enter a valid URN or UKPRN, if known',
    });
  });

  it('should send the support request and redirect if urn is not set', async () => {
    req.body.urn = undefined;

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should send the support request and redirect if urn is set and is in URN format', async () => {
    req.body.urn = '123456';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should send the support request and redirect if urn is set and is in UKPRN format', async () => {
    req.body.urn = '10012345';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should render error view if the request type is not specified', async () => {
    req.body.type = undefined;

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      type: 'Select the type of issue you need help with',
    });
  });

  it('should render error view if the request type is "other" and the typeOtherMessage field is empty', async () => {
    req.body.type = 'other';
    req.body.typeOtherMessage = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      typeOtherMessage: 'Enter a summary of your issue',
    });
  });

  it('should render error view if the typeOtherMessage field has more than 200 characters', async () => {
    req.body.typeOtherMessage = createString(201);

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      typeOtherMessage: 'Issue summary must be 200 characters or less',
    });
  });

  it('should send the support request and redirect if the request type is not "other" and the typeOtherMessage field is empty', async () => {
    req.body.type = 'test type';
    req.body.typeOtherMessage = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should send the support request and redirect if the request type is "other" and the typeOtherMessage field is between 1 and 200 characters', async () => {
    req.body.type = 'other';
    req.body.typeOtherMessage = createString(199);

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should render error view if service is not specified', async () => {
    req.body.service = undefined;

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      service: 'Select the service you are trying to use',
    });
  });

  it('should render error view if service is specified but is not in the services list', async () => {
    req.body.service = 'does not exist';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      service: 'Select the service you are trying to use',
    });
  });

  it('should send the support request and redirect if the service is specified and in the services list', async () => {
    req.body.service = 'test service';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should send the support request and redirect if the service is specified and is "Other"', async () => {
    req.body.service = 'Other';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should send the support request and redirect if the service is specified and is "None"', async () => {
    req.body.service = 'None';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should render error view if message is missing', async () => {
    req.body.message = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      orgName: req.body.orgName,
      message: req.body.message,
      referrer: '/dashboard',
      service: 'test service',
      services: mockServicesOutput,
      title: 'DfE Sign-in',
      type: 'test type',
      typeOtherMessage: '',
      urn: req.body.urn,
      backLink: true,
      isHidden: true,
      isHomeTopHidden: true,
      validationMessages: {
        message: 'Enter information about your issue',
      },
    });
  });

  it('should render error view if message is too long', async () => {
    req.body.message = createString(1001);

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      orgName: req.body.orgName,
      message: req.body.message,
      referrer: '/dashboard',
      service: 'test service',
      services: mockServicesOutput,
      title: 'DfE Sign-in',
      type: 'test type',
      typeOtherMessage: '',
      urn: req.body.urn,
      backLink: true,
      isHidden: true,
      isHomeTopHidden: true,
      validationMessages: {
        message: 'Message cannot be longer than 1000 characters',
      },
    });
  });

  it('should render error view if the name and orgName fields are both valid and equal', async () => {
    req.body.name = 'test value';
    req.body.orgName = 'test value';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      name: 'Your name and your organisation\'s name must not match',
      orgName: 'Your name and your organisation\'s name must not match',
    });
  });

  it('should render error view if the name and orgName fields are both valid and equal (case-insensitive)', async () => {
    req.body.name = 'test value';
    req.body.orgName = 'TeSt VaLue';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      name: 'Your name and your organisation\'s name must not match',
      orgName: 'Your name and your organisation\'s name must not match',
    });
  });

  it('should render error view if the typeOtherMessage and message fields are both valid and equal', async () => {
    req.body.typeOtherMessage = 'test value';
    req.body.message = 'test value';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      typeOtherMessage: 'Issue summary and further details must not match',
      message: 'Issue summary and further details must not match',
    });
  });

  it('should render error view if the typeOtherMessage and message fields are both valid and equal (case-insensitive)', async () => {
    req.body.typeOtherMessage = 'tEsT vAlUe';
    req.body.message = 'test value';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      typeOtherMessage: 'Issue summary and further details must not match',
      message: 'Issue summary and further details must not match',
    });
  });

  it('should render error view if the typeOtherMessage and message (first 200 characters) fields are both valid and equal', async () => {
    req.body.typeOtherMessage = 'test value'.repeat(20);
    req.body.message = `${'test value'.repeat(20)}${createString(800)}`;

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      typeOtherMessage: 'Issue summary and further details must not match',
      message: 'Issue summary and further details must not match',
    });
  });

  it('should render error view if the typeOtherMessage and message (first 200 characters) fields are both valid and equal (case-insensitive)', async () => {
    req.body.typeOtherMessage = 'tEsT vAlUe'.repeat(20);
    req.body.message = `${'test value'.repeat(20)}${createString(800)}`;

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
    expect(res.render.mock.calls[0][1]).toHaveProperty('validationMessages', {
      typeOtherMessage: 'Issue summary and further details must not match',
      message: 'Issue summary and further details must not match',
    });
  });

  it('should log the request and redirect if one of the honeypot fields is filled in', async () => {
    req.body.phoneNumber = '';
    req.body.password = 'foo';

    await postContactForm(req, res);

    expect(logger.audit.mock.calls).toHaveLength(1);
    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should log the request and redirect if both of the honeypot fields are filled in', async () => {
    req.body.phoneNumber = 'foo';
    req.body.password = 'foo';

    await postContactForm(req, res);

    expect(logger.audit.mock.calls).toHaveLength(1);
    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should log the request and redirect if one of the honeypot fields is not a string', async () => {
    req.body.phoneNumber = [];
    req.body.password = '';

    await postContactForm(req, res);

    expect(logger.audit.mock.calls).toHaveLength(1);
    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should log the request and redirect if both of the honeypot fields are not strings', async () => {
    req.body.phoneNumber = [];
    req.body.password = undefined;

    await postContactForm(req, res);

    expect(logger.audit.mock.calls).toHaveLength(1);
    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });

  it('should log the correct details if the honeypot fields are filled in or a different type', async () => {
    req.body.phoneNumber = 'foo';
    req.body.password = [];

    const {
      name, email, orgName, urn, type, typeOtherMessage, service, message,
    } = req.body;

    await postContactForm(req, res);

    expect(logger.audit.mock.calls).toHaveLength(1);
    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(logger.audit.mock.calls[0][0]).toEqual({
      type: 'contact-form',
      subType: 'spam-detection',
      application: 'help',
      env: 'dev',
      message: 'Spam detected in contact form (honeypot field(s) filled)',
      meta: {
        body: JSON.stringify({
          name, email, orgName, urn, type, typeOtherMessage, service, message,
        }),
      },
    });
  });

  it('should send the support request and redirect if both of the honeypot fields are empty strings', async () => {
    req.body.phoneNumber = '';
    req.body.password = '';

    await postContactForm(req, res);

    expect(logger.audit.mock.calls).toHaveLength(0);
    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls.length).toBe(1);
    expect(res.redirect.mock.calls[0][0]).toBe('/contact-us/completed');
  });
});
