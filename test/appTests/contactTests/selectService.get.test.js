jest.mock('./../../../src/infrastructure/config', () => require('./../../utils').configMockFactory());

jest.mock('./../../../src/infrastructure/applications', () => {
  return {
    listAllServices: jest.fn(),
  };
});

const { getRequestMock, getResponseMock } = require('./../../utils');
const { listAllServices } = require('./../../../src/infrastructure/applications');
const res = getResponseMock();


describe('when displaying the select service help page', () => {
  let req;
  let getSelectService;

  beforeEach(() => {
    req = getRequestMock({
    });
    res.mockResetAll();


    listAllServices.mockReset();
    listAllServices.mockReturnValue({
      services: [{
        id: 'service1',
        dateActivated: '10/10/2018',
        name: 'service name',
        status: 'active',
        isExternalService: true,
        relyingParty: {
          params: {}
        }
      }]
    });
    getSelectService = require('./../../../src/app/contact/selectService').get;
  });

  it('then it should render the select service view', async () => {
    await getSelectService(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/selectService');
  });

  it('then it should get the service details', async () => {
    await getSelectService(req, res);
    expect(listAllServices.mock.calls).toHaveLength(1);
    expect(listAllServices.mock.calls[0][0]).toBe('correlationId');
  });

  it('then it should include mapped services', async () => {
    await getSelectService(req, res);

    expect(res.render.mock.calls[0][1].services).toBeDefined();
    expect(res.render.mock.calls[0][1].services).toHaveLength(1);
    expect(res.render.mock.calls[0][1].services[0]).toEqual({
      id: 'service1',
      name: 'service name'
    });
  });
});
