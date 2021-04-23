const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    header: 'Find help with...',
    description: 'Choose the main topic for which you need assistance. Each category contains articles designed to help with specific questions.',
    sections: [
      {
        title: 'Services',
        link: '/services',
        text: 'Find help with services, including how to add or request a service, and what to do when a service is unavailable.',
      },
      {
        title: 'Organisations',
        link: '/services',
        text: 'Find help with organisations, including how to request access to an organisation, and how to add multiple organisations to a single account.',
      },
      {
        title: 'Manage users',
        link: '/services',
        text: 'Find help with manage users, including how to invite new users, and how to add a service to a user.',
      },
      {
        title: 'Requests',
        link: '/services',
        text: 'Find help with requests, including how to raise a request, and how to either approve or reject the requests that you manage.',
      },
      {
        title: 'Profile',
        link: '/services',
        text: 'Find help with your profile, including how to change your email address and password.',
      },
      {
        title: 'Approvers',
        link: '/services',
        text: 'Find help with approver-related questions, including what an approver is and what they do.',
      },
      {
        title: 'End users',
        link: '/services',
        text: 'Find help with end user-related questions, including how to add a service to an end user.',
      },
    ],
    relatedArticles: {
      title: 'Most popular help topics',
      items: [
        {
          text: 'How do I approve a request?',
          link: '/services',
        },
        {
          text: 'What is an approver?',
          link: '/services',
        },
        {
          text: 'How do I request access to a service?',
          link: '/services',
        },
        {
          text: 'How do I add a service to my account?',
          link: '/services',
        },
        {
          text: 'Do I need a separate email address for each organisation?',
          link: '/services',
        },
      ],
    },
  };
  return res.render('dashboard/views/dashboard', model);
};

module.exports = {
  get,
};
