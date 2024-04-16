const loggerMockFactory = () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  audit: jest.fn(),
  mockResetAll() {
    this.info.mockReset();
    this.warn.mockReset();
    this.error.mockReset();
    this.audit.mockReset();
  },
});

const expressAuthenticationStub = (authenticated, extras) => (req, res, next) => {
  req.isAuthenticated = () => authenticated;
  req.user = {};
  Object.assign(req, extras);

  if (!res.locals) {
    res.locals = {};
  }
  res.locals.flash = {};
  res.locals.profilesUrl = '';

  next();
};

const configMockFactory = (customConfig) => ({
  hostingEnvironment: {
    agentKeepAlive: {},
    env: 'test-run',
  },
  applications: {
    type: 'static',
  },
  access: {
    type: 'static',
  },
  notifications: {
    connectionString: 'test',
  },
  loggerSettings: {},
  ...customConfig,
});

const getRequestMock = (customRequest = {}) => ({
  id: 'correlationId',
  accepts: jest.fn().mockReturnValue(['text/html']),
  params: {},
  csrfToken: jest.fn().mockReturnValue('token'),
  isAuthenticated: jest.fn().mockReturnValue(true),
  body: {},
  query: {},
  headers: {},
  user: {
    sub: 'suser1',
    email: 'super.user@unit.test',
  },
  app: { locals: { urls: { profile: 'profileurl' }, isLoggedIn: true } },
  session: {},
  ...customRequest,
});

const getResponseMock = () => {
  const res = {
    render: jest.fn(),
    redirect: jest.fn(),
    status: jest.fn(),
    contentType: jest.fn(),
    send: jest.fn(),
    flash: jest.fn(),
    isAuthenticated: jest.fn(),
    mockResetAll() {
      this.render.mockReturnValue(res);
      this.redirect.mockReturnValue(res);
      this.status.mockReturnValue(res);
      this.contentType.mockReturnValue(res);
      this.flash.mockReset();
      this.isAuthenticated.mockReturnValue(res);
    },
  };

  res.mockResetAll();
  return res;
};

module.exports = {
  loggerMockFactory,
  configMockFactory,
  getRequestMock,
  getResponseMock,
  expressAuthenticationStub,
};
