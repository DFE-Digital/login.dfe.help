const getAddOrganisationHelp = async (req, res) => {
    const service = req.params.sid ? await getServiceById(req.params.sid, req.id) : undefined;
    const model = {
        csrfToken: req.csrfToken(),
        title: 'DfE Sign-in help',
        backLink: true,
        service,
    };
    return res.render('contact/views/addOrganisationHelp', model);
};

module.exports = getAddOrganisationHelp;

