jest.mock('./../../../src/infrastructure/config', () => require('./../../utils').configMockFactory());
jest.mock('./../../../src/infrastructure/applications', () => {
  return {
    getServiceById: jest.fn(),
  };
});

const { getRequestMock, getResponseMock } = require('./../../utils');
const res = getResponseMock();
const { getServiceById } = require('./../../../src/infrastructure/applications');

describe('when displaying the access service page', () => {
  let req;
  const getAccessService = require('./../../../src/app/contact/getAccessService');

  beforeEach(() => {
    req = getRequestMock({
      params: {
        sid: 'service1',
      }
    });
    res.mockResetAll();

    getServiceById.mockReset();
    getServiceById.mockReturnValue({
      id: 'service1',
      name: 'service one',
    })
  });

  it('then it should render the access service view', async () => {
    await getAccessService(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/accessService');
  });

  it('then it should include csrf token', async () => {
    await getAccessService(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
    });
  });

  it('then it should include the title', async () => {
    await getAccessService(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: 'DfE Sign-in help'
    });
  });

  it('then it should get the service details', async () => {
    await getAccessService(req, res);
    expect(getServiceById.mock.calls).toHaveLength(1);
    expect(getServiceById.mock.calls[0][0]).toBe('service1');
    expect(getServiceById.mock.calls[0][1]).toBe('correlationId');
  });

  it('then it should include service details in the model', async () => {
    await getAccessService(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      service: {
        id: 'service1',
        name: 'service one',
      }
    });
  });
});
