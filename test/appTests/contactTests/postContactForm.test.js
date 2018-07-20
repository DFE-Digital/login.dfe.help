jest.mock('./../../../src/infrastructure/config', () => {
  return {
    notifications: {
      connectionString: 'redis://localhost:6379?db=99',
    },
  };
});
jest.mock('login.dfe.notifications.client');

const NotificationClient = require('login.dfe.notifications.client');
const sendSupportRequest = jest.fn();
NotificationClient.mockImplementation(() => {
  return {
    sendSupportRequest,
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

describe('When handling postback of contact form', () => {
  let req;
  let res;
  let postContactForm;

  beforeEach(() => {
    req = {
      csrfToken: () => 'csrf-token',
      body: {
        name: 'User One',
        email: 'user.one@unit.test',
        phone: '01234 567890',
        service: 'DfE Sign-in Client Service',
        message: 'Please help me',
      },
      session:{},
    };

    res = {
      redirect: jest.fn(),
      render: jest.fn(),
    };

    sendSupportRequest.mockReset();
    NotificationClient.mockImplementation(() => {
      return {
        sendSupportRequest,
      };
    });

    NotificationClient.mockReset();
    NotificationClient.mockImplementation(() => {
      return {
        sendSupportRequest,
      };
    });

    postContactForm = require('./../../../src/app/contact/postContactForm');
  });

  it('then it should create NotificationClient with config connection string', async () => {
    await postContactForm(req, res);

    expect(NotificationClient.mock.calls).toHaveLength(1);
    expect(NotificationClient.mock.calls[0][0]).toEqual({
      connectionString: 'redis://localhost:6379?db=99',
    });
  });

  it('then it should send support request job with form details', async () => {
    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(sendSupportRequest.mock.calls[0][0]).toBe(req.body.name);
    expect(sendSupportRequest.mock.calls[0][1]).toBe(req.body.email);
    expect(sendSupportRequest.mock.calls[0][2]).toBe(req.body.phone);
    expect(sendSupportRequest.mock.calls[0][3]).toBe(req.body.service);
    expect(sendSupportRequest.mock.calls[0][4]).toBe(req.body.message);
  });

  it('then it should send support request job with generated reference', async () => {
    await postContactForm(req, res);

    expect(sendSupportRequest.mock.calls).toHaveLength(1);
    expect(sendSupportRequest.mock.calls[0][5]).toMatch(/SIR[0-9]{7}/);
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
      message: req.body.message,
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
      message: req.body.message,
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
      message: req.body.message,
      validationMessages: {
        message: 'Please enter a details of the support your require',
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
      message: req.body.message,
      validationMessages: {
        message: 'Message cannot be longer than 1000 characters',
      },
    });
  });
});
