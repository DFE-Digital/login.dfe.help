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
  let postSelectService;

  beforeEach(() => {
    req = getRequestMock({
      body: {
        selectedService: 'service1'
      }
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
    postSelectService = require('./../../../src/app/contact/selectService').post;
  });

  it('then it should render view if no service selected', async () => {
    req.body.selectedService = undefined;

    await postSelectService(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/selectService');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'token',
      selectedService: undefined,
      title: 'DfE Sign-in help',
      backLink: true,
      services: [
        {
          id: 'service1',
          name: 'service name',
        }
      ],
      validationMessages: {
        service: 'Please select a service',
      },
    });
  });

  it('then it should redirect to service help if a service is selected', async () => {

    await postSelectService(req, res);

    expect(res.redirect.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls[0][0]).toBe(`service/service1`);
  });

  it('then it should redirect to form if other selected', async () => {
    req.body.selectedService = 'other';
    await postSelectService(req, res);

    expect(res.redirect.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls[0][0]).toBe(`/contact/form`);
  });
});
