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
        },
        {
          id: "service2",
          name: "COLLECT",
          isExternalService: true,
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

  const fullyHiddenService = (id, paramValue) => ({
    id,
    name: "Hidden Service",
    isExternalService: true,
    relyingParty: {
      params: {
        hideApprover: paramValue,
        hideSupport: paramValue,
        helpHidden: paramValue,
      },
    },
  });

  it("should exclude services where all three hide params are string 'true'", async () => {
    listAllServices.mockReturnValue({
      services: [fullyHiddenService("h1", "true")],
    });

    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1].services).toHaveLength(0);
  });

  it("should exclude services where all three hide params are integer 1", async () => {
    listAllServices.mockReturnValue({
      services: [fullyHiddenService("h2", 1)],
    });

    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1].services).toHaveLength(0);
  });

  it("should exclude services where all three hide params are boolean true", async () => {
    listAllServices.mockReturnValue({
      services: [fullyHiddenService("h3", true)],
    });

    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1].services).toHaveLength(0);
  });

  it("should exclude id-only services where isHiddenService is truthy", async () => {
    listAllServices.mockReturnValue({
      services: [
        {
          id: "svc-hidden-id-only",
          name: "Hidden Id Only Service",
          isExternalService: true,
          isIdOnlyService: true,
          isHiddenService: 1,
        },
      ],
    });

    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1].services).toHaveLength(0);
  });

  it("should keep a service visible when only helpHidden is truthy", async () => {
    listAllServices.mockReturnValue({
      services: [
        {
          id: "svc-partial",
          name: "Partial Hide Service",
          isExternalService: true,
          relyingParty: { params: { helpHidden: "true" } },
        },
      ],
    });

    await getContactUs(req, res);

    expect(res.render.mock.calls[0][1].services.map((s) => s.id)).toContain(
      "svc-partial",
    );
  });
});
