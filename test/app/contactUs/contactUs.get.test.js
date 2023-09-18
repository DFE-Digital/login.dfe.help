jest.mock('./../../../src/infrastructure/config', () => require('../../utils').configMockFactory());

jest.mock('./../../../src/infrastructure/applications', () => {
  return {
    listAllServices: jest.fn(),
  };
});

const { listAllServices } = require('./../../../src/infrastructure/applications');

const { getRequestMock, getResponseMock } = require('../../utils');

const res = getResponseMock();

describe('when displaying the contact us page', () => {
  let req;
  let getContactUs;

  beforeEach(() => {
    req = getRequestMock({
      get: jest.fn().mockReturnValue('https://test_referrer.com/test_referrer'),
    });
    res.mockResetAll();
    getContactUs = require('../../../src/app/contactUs/getContactUs').get;

    listAllServices.mockReset().mockReturnValue({
      services: [
        {
          id: 'service1',
          name: 'analyse school performance',
          isExternalService: true,
        },
        {
          id: 'service2',
          name: 'COLLECT',
          isExternalService: true,
        },
      ],
    });
  });

  it('should render the contact us form', async () => {
    await getContactUs(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contactUs/views/contactUs');
  });

  it('should include csrf token', async () => {
    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: 'token',
    });
  });

  it('should include the title', async () => {
    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: 'DfE Sign-in',
    });
  });

  it('should include the referrer', async () => {
    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      referrer: '/test_referrer',
    });
  });

});
