jest.mock('./../../../src/infrastructure/config', () => require('./../../utils').configMockFactory());

const { getRequestMock, getResponseMock } = require('./../../utils');
const res = getResponseMock();

describe('when displaying the new approver help page', () => {
  let req;
  const getNewApprover = require('./../../../src/app/contact/getNewApprover');

  beforeEach(() => {
    req = getRequestMock({});
    res.mockResetAll();
  });

  it('then it should render the new approver help page', async () => {
    await getNewApprover(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/newApprover');
  });

  it('then it should include csrf token', async () => {
    await getNewApprover(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
    });
  });

  it('then it should include the title', async () => {
    await getNewApprover(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: 'DfE Sign-in help'
    });
  });
});

