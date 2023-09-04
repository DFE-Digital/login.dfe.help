jest.mock('./../../../src/infrastructure/config', () => require('../../utils').configMockFactory());

const { getRequestMock, getResponseMock } = require('../../utils');

const res = getResponseMock();

describe('when displaying the help page for manageConsole/howtoEditServiceConfig', () => {
  let req;
  let getDashboard;

  beforeEach(() => {
    req = getRequestMock();
    res.mockResetAll();
    getDashboard = require('../../../src/app/manageConsole/howtoEditServiceConfig').get;
  });

  it('should render the help page for manageConsole/howToEditServiceConsole', async () => {
    await getDashboard(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('manageConsole/views/howtoEditServiceConfig');
  });

  it('should include csrf token', async () => {
    await getDashboard(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
    });
  });

  it('should include the title', async () => {
    await getDashboard(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: 'DfE Sign-in help',
    });
  });

});
