jest.mock('./../../../src/infrastructure/config', () => require('./../../utils').configMockFactory());

const { getRequestMock, getResponseMock } = require('./../../utils');
const res = getResponseMock();

describe('when selecting the type of service issue', () => {
  let req;
  let postServiceHelp;

  beforeEach(() => {
    req = getRequestMock({
      body: {
        selectedServiceHelp: 'add-service',
      },
      params: {
        sid: 'service1'
      }
    });
    res.mockResetAll();
    postServiceHelp = require('./../../../src/app/contact/serviceHelp').post;
  });

  it('then it should render view if no radio button selected', async () => {
    req.body.selectedServiceHelp = undefined;

    await postServiceHelp(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/serviceHelp');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'token',
      selectedServiceHelp: undefined,
      title: 'DfE Sign-in help',
      backLink: true,
      validationMessages: {
        selectedServiceHelp: 'An option must be selected',
      },
    });
  });

  it('then it should redirect to add service page if query about adding service', async () => {

    await postServiceHelp(req, res);

    expect(res.redirect.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls[0][0]).toBe(`service1/access-service`);
  });

  it('then it should redirect to add verification email page if query about verification email', async () => {
    req.body.selectedServiceHelp = 'verification-email';

    await postServiceHelp(req, res);

    expect(res.redirect.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls[0][0]).toBe(`service1/verification-email`);
  });
});
