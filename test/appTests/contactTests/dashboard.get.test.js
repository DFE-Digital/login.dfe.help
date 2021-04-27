jest.mock('./../../../src/infrastructure/config', () => require('../../utils').configMockFactory());

const { getRequestMock, getResponseMock } = require('../../utils');
const res = getResponseMock();

describe('when displaying the help homepage', () => {
  let req;
  let getHelp;

  beforeEach(() => {
    req = getRequestMock({
      body: {
        selectedHelp: 'access-service',
      }
    });
    res.mockResetAll();
    getHelp = require('./../../../src/app/contact/help').get;
  });

  it('then it should render the help view', async () => {
    await getHelp(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/help');
  });

  it('then it should include csrf token', async () => {
    await getHelp(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
    });
  });

  it('then it should include the title', async () => {
    await getHelp(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: 'DfE Sign-in help'
    });
  });
});
