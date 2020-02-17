jest.mock('./../../../src/infrastructure/config', () => require('./../../utils').configMockFactory());

const { getRequestMock, getResponseMock } = require('./../../utils');
const res = getResponseMock();

describe('when displaying the create account help page', () => {
  let req;
  const getCreateAccount = require('./../../../src/app/contact/getCreateAccountHelp');

  beforeEach(() => {
    req = getRequestMock({});
    req.app.locals.urls.profile = "somepath";
    res.mockResetAll();
  });

  it('then it should render the create account page', async () => {
    await getCreateAccount(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/createAccountHelp');
  });

  it('then it should include csrf token', async () => {
    await getCreateAccount(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
    });
  });

  it('then it should include the title', async () => {
    await getCreateAccount(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: 'DfE Sign-in help'
    });
  });

});
