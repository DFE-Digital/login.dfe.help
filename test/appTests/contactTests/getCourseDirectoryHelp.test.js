jest.mock('./../../../src/infrastructure/config', () => require('./../../utils').configMockFactory());
jest.mock('./../../../src/infrastructure/applications', () => {
    return {
        getServiceById: jest.fn(),
    };
});

const {getRequestMock, getResponseMock} = require('./../../utils');
const res = getResponseMock();
const {getServiceById} = require('./../../../src/infrastructure/applications');

describe('when displaying the access service page', () => {
    let req;
    const getCourseDirectory = require('./../../../src/app/contact/getCourseDirectoryHelp');

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

    it('then it should render the course directory help view', async () => {
        await getCourseDirectory(req, res);

        expect(res.render.mock.calls).toHaveLength(1);
        expect(res.render.mock.calls[0][0]).toBe('contact/views/courseDirectoryHelp');
    });

    it('then it should include csrf token', async () => {
        await getCourseDirectory(req, res);

        expect(res.render.mock.calls[0][1]).toMatchObject({
            csrfToken: 'token',
        });
    });

    it('then it should include the title', async () => {
        await getCourseDirectory(req, res);

        expect(res.render.mock.calls[0][1]).toMatchObject({
            title: 'DfE Sign-in help'
        });
    });

    it('then it should include backLink in the model', async () => {
        await getCourseDirectory(req, res);

        expect(res.render.mock.calls[0][1]).toMatchObject({
                backLink: true,
                csrfToken: "token",
                title: "DfE Sign-in help",
            }
        );
    });
});
