jest.mock('./../../../src/infrastructure/config', () => require('../../utils').configMockFactory());

const { getRequestMock, getResponseMock } = require('../../utils');

const res = getResponseMock();

describe('when displaying the contact us page', () => {
  let req;
  let getContactUs;

  beforeEach(() => {
    req = getRequestMock({
      get: jest.fn().mockReturnValue('test_referrer'),
    });
    res.mockResetAll();
    getContactUs = require('../../../src/app/contactUs/getContactUs').get;
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
      title: 'DfE Sign-in help',
    });
  });

  it('should include the referrer', async () => {
    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      referrer: 'test_referrer',
    });
  });

});
