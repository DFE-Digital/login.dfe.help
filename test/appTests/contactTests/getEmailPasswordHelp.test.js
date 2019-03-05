jest.mock('./../../../src/infrastructure/config', () => require('./../../utils').configMockFactory());

const { getRequestMock, getResponseMock } = require('./../../utils');
const res = getResponseMock();

describe('when displaying the email/password help page', () => {
  let req;
  const getEmailPasswordHelp = require('./../../../src/app/contact/getEmailPasswordhelp');

  beforeEach(() => {
    req = getRequestMock({});
    res.mockResetAll();
  });

  it('then it should render the email/password help page', async () => {
    await getEmailPasswordHelp(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/emailPasswordHelp');
  });

  it('then it should include csrf token', async () => {
    await getEmailPasswordHelp(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
    });
  });

  it('then it should include the title', async () => {
    await getEmailPasswordHelp(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: 'DfE Sign-in help'
    });
  });
});
