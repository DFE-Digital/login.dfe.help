jest.mock('./../../../src/infrastructure/config', () => require('./../../utils').configMockFactory());

const { getRequestMock, getResponseMock } = require('./../../utils');
const res = getResponseMock();

describe('when displaying the service help page', () => {
  let req;
  let getServiceHelp;

  beforeEach(() => {
    req = getRequestMock({
      body: {
        selectedServiceHelp: 'add-service',
      }
    });
    res.mockResetAll();
    getServiceHelp = require('./../../../src/app/contact/serviceHelp').get;
  });

  it('then it should render the service help view', async () => {
    await getServiceHelp(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/serviceHelp');
  });


  it('then it should include csrf token', async () => {
    await getServiceHelp(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
    });
  });

  it('then it should include the title', async () => {
    await getServiceHelp(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: 'DfE Sign-in help'
    });
  });
});
