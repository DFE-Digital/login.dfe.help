jest.mock('./../../../src/infrastructure/config', () => require('./../../utils').configMockFactory());

const { getRequestMock, getResponseMock } = require('./../../utils');
const res = getResponseMock();

describe('when selecting the help required', () => {
  let req;
  let postHelp;

  beforeEach(() => {
    req = getRequestMock({
      body: {
        selectedHelp: 'access-service',
      }
    });
    res.mockResetAll();
    postHelp = require('./../../../src/app/contact/help').post;
  });

  it('then it should render view if no radio button selected', async () => {
    req.body.selectedHelp = undefined;

    await postHelp(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe('contact/views/help');
    expect(res.render.mock.calls[0][1]).toEqual({
      csrfToken: 'token',
      selectedHelp: undefined,
      title: 'DfE Sign-in help',
      validationMessages: {
        selectedHelp: 'Please answer this question',
      },
    });
  });

  it('then it should redirect to service if query about accessing a service', async () => {

    await postHelp(req, res);

    expect(res.redirect.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls[0][0]).toBe(`contact/service`);
  });

  it('then it should redirect to email-password if query about email/password', async () => {
    req.body.selectedHelp = 'email-password';
    await postHelp(req, res);

    expect(res.redirect.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls[0][0]).toBe(`contact/email-password`);
  });

  it('then it should redirect to approver if approver query', async () => {
    req.body.selectedHelp = 'approver';
    await postHelp(req, res);

    expect(res.redirect.mock.calls).toHaveLength(1);
    expect(res.redirect.mock.calls[0][0]).toBe(`contact/approver`);
  });

});
