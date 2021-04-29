jest.mock('./../../../src/infrastructure/config', () => require('../../utils').configMockFactory());

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
        saUsername: 'userOne',
        message: 'Please help me',
        orgName: 'Organisation name'
      },
      session: {},
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

    postContactForm = require('./../../../src/app/contactUs/postContactUs');
  });

  it(
    'then it should create NotificationClient with config connection string', async () => {
    await postContactForm(req, res);

    expect(NotificationClient.mock.calls).toHaveLength(1);
    expect(NotificationClient.mock.calls[0][0]).toEqual({
      connectionString: 'test',
    });
  });

  it('then it should send support request job with form details', async () => {
    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(sendSupportRequest.mock.calls[0][0]).toBe(req.body.name);
    expect(sendSupportRequest.mock.calls[0][1]).toBe(req.body.email);
    expect(sendSupportRequest.mock.calls[0][2]).toBe(req.body.phone);
    expect(sendSupportRequest.mock.calls[0][3]).toBe(req.body.service);
    expect(sendSupportRequest.mock.calls[0][4]).toBe(req.body.type);
    expect(sendSupportRequest.mock.calls[0][5]).toBe(req.body.message);
  });

  it('then it should render error view if name is missing', async () => {
    req.body.name = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/contactForm');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      type: req.body.type,
      message: req.body.message,
      orgName: req.body.orgName,
      backLink: true,
      isHidden: true,
      services: [
        {
          id: 'service2',
          name: 'COLLECT'
        },
        {
          id: 'service1',
          name: 'analyse school performance'
        }
      ],
      validationMessages: {
        name: 'Please enter your full name',
      },
    });
  });

  it('then it should render error view if email is missing', async () => {
    req.body.email = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/contactForm');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      type: req.body.type,
      message: req.body.message,
      orgName: req.body.orgName,
      backLink: true,
      isHidden: true,
      services: [
        {
          id: 'service2',
          name: 'COLLECT'
        },
        {
          id: 'service1',
          name: 'analyse school performance'
        }
      ],
      validationMessages: {
        email: 'Please enter your email address',
      },
    });
  });

  it('then it should render error view if message is missing', async () => {
    req.body.message = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/contactForm');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      type: req.body.type,
      message: req.body.message,
      orgName: req.body.orgName,
      backLink: true,
      isHidden: true,
      services: [
        {
          id: 'service2',
          name: 'COLLECT'
        },
        {
          id: 'service1',
          name: 'analyse school performance'
        }
      ],
      validationMessages: {
        message: 'Please enter the details of the support you require',
      },
    });
  });

  it('then it should render error view if service is missing', async () => {
    req.body.service = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/contactForm');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      type: req.body.type,
      message: req.body.message,
      orgName: req.body.orgName,
      backLink: true,
      isHidden: true,
      services: [
        {
          id: 'service2',
          name: 'COLLECT'
        },
        {
          id: 'service1',
          name: 'analyse school performance'
        }
      ],
      validationMessages: {
        service: 'Please select the service you are using',
      },
    });
  });

  it('then it should render error view if type is missing', async () => {
    req.body.type = '';

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/contactForm');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      type: req.body.type,
      message: req.body.message,
      orgName: req.body.orgName,
      backLink: true,
      isHidden: true,
      services: [
        {
          id: 'service2',
          name: 'COLLECT'
        },
        {
          id: 'service1',
          name: 'analyse school performance'
        }
      ],
      validationMessages: {
        type: 'Please select a type of issue',
      },
    });
  });

  it('then it should render error view if message is too long', async () => {
    req.body.message = createString(1001);

    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(0);
    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/contactForm');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'csrf-token',
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      type: req.body.type,
      message: req.body.message,
      orgName: req.body.orgName,
      backLink: true,
      isHidden: true,
      services: [
        {
          id: 'service2',
          name: 'COLLECT'
        },
        {
          id: 'service1',
          name: 'analyse school performance'
        }
      ],
      validationMessages: {
        message: 'Message cannot be longer than 1000 characters',
      },
    });
  });
});
