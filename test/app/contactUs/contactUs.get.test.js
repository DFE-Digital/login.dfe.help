// Disabled global require for config Mock to ensure the mock factory can be used.

jest.mock("./../../../src/infrastructure/config", () =>
  require("../../utils").configMockFactory(),
);
jest.mock("./../../../src/infrastructure/applications", () => ({
  listAllServices: jest.fn(),
}));

const {
  get: getContactUs,
} = require("../../../src/app/contactUs/getContactUs");
const { listAllServices } = require("../../../src/infrastructure/applications");
const { getRequestMock, getResponseMock } = require("../../utils");

describe("when displaying the contact us page", () => {
  let req;
  const res = getResponseMock();

  beforeEach(() => {
    req = getRequestMock({
      get: jest.fn().mockReturnValue("https://test_referrer.com/test_referrer"),
    });
    res.mockResetAll();

    listAllServices.mockReset().mockReturnValue({
      services: [
        {
          id: "service1",
          name: "analyse school performance",
          isExternalService: true,
          isHiddenForHelp: false,
        },
        {
          id: "service2",
          name: "COLLECT",
          isExternalService: true,
          isHiddenForHelp: false,
        },
      ],
    });
  });

  it("should render the contact us form", async () => {
    await getContactUs(req, res);

    expect(res.render.mock.calls).toHaveLength(1);
    expect(res.render.mock.calls[0][0]).toBe("contactUs/views/contactUs");
  });

  it("should include csrf token", async () => {
    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      csrfToken: "token",
    });
  });

  it("should include the title", async () => {
    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      title: "DfE Sign-in",
    });
  });

  it("should include the referrer", async () => {
    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1]).toMatchObject({
      referrer: "/test_referrer",
    });
  });

  it("should exclude services where isHiddenForHelp is true", async () => {
    listAllServices.mockReset().mockReturnValue({
      services: [
        {
          id: "hidden-svc",
          name: "Hidden Service",
          isExternalService: true,
          isHiddenForHelp: true,
        },
      ],
    });
    await getContactUs(req, res);
    const services = res.render.mock.calls[0][1].services;
    expect(services).toHaveLength(0);
  });

  it("should include services where isHiddenForHelp is false", async () => {
    listAllServices.mockReset().mockReturnValue({
      services: [
        {
          id: "visible-svc",
          name: "Visible Service",
          isExternalService: true,
          isHiddenForHelp: false,
        },
      ],
    });
    await getContactUs(req, res);
    const services = res.render.mock.calls[0][1].services;
    expect(services).toHaveLength(1);
    expect(services[0].id).toBe("visible-svc");
  });
});
