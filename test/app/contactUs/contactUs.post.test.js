jest.mock('./../../../src/infrastructure/config', () => require('../../utils').configMockFactory());

jest.mock('./../../../src/infrastructure/applications', () => {
  return {
    listAllServices: jest.fn(),
  };
});

const { listAllServices } = require('./../../../src/infrastructure/applications');

jest.mock('login.dfe.notifications.client');

const NotificationClient = require('login.dfe.notifications.client');
const sendSupportRequest = jest.fn();
const sendSupportRequestConfirmation = jest.fn();
NotificationClient.mockImplementation(() => {
  return {
    sendSupportRequest,
    sendSupportRequestConfirmation,
  };
});

const createString = (length) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let str = '';
  for (let i = 0; i < length; i += 1) {
    str = str + charset[Math.random() * charset.length];
  }
  return str;
};

const mockServicesInput = [
  {
    id: 'service1',
    name: 'analyse school performance',
    isExternalService: true,
  },
];

const mockServicesOutput = [
  {
    id: 'service1',
    name: 'analyse school performance',
  },
];

describe('When handling post of contact form', () => {
  let req;
  let res;
  let postContactForm;

  beforeEach(() => {
    req = {
      csrfToken: () => 'csrf-token',
      body: {
        name: 'User One',
        email: 'user.one@unit.test',
        message: 'Please help me',
        orgName: 'Organisation name',
        urn: '1234',
        service: 'test service',
        type: 'test type',
        typeOtherMessage: '',
      },
      session: {},
      query: {},
    };

    res = {
      redirect: jest.fn(),
      render: jest.fn(),
    };

    sendSupportRequest.mockReset();
    sendSupportRequestConfirmation.mockReset();
    NotificationClient.mockImplementation(() => {
      return {
        sendSupportRequest,
        sendSupportRequestConfirmation,
      };
    });

    NotificationClient.mockReset();
    NotificationClient.mockImplementation(() => {
      return {
        sendSupportRequest,
        sendSupportRequestConfirmation,
      };
    });

    listAllServices.mockReset().mockReturnValue({
      services: mockServicesInput,
    });

    postContactForm = require('./../../../src/app/contactUs/postContactUs').post;
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

});
