jest.mock('./../../../src/infrastructure/config', () => require('./../../utils').configMockFactory());

const { getRequestMock, getResponseMock } = require('./../../utils');
const res = getResponseMock();

describe('when displaying the email/password help page', () => {
  let req;
  const getApproverHelp = require('./../../../src/app/contact/getApproverHelp');

  beforeEach(() => {
    req = getRequestMock({});
    res.mockResetAll();
  });

  it('then it should render the approver help page', async () => {
    await getApproverHelp(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/approverHelp');
  });

  it('then it should include csrf token', async () => {
    await getApproverHelp(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
    });
  });

  it('then it should include the title', async () => {
    await getApproverHelp(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: 'DfE Sign-in help'
    });
  });

});
