const get = async (req, res) => {
  const model = {
    csrfToken: req.csrfToken(),
    title: 'DfE Sign-in help',
    header: 'Help: Services',
    description: 'Here are some common questions related to services.',
    sections: [
      {
        title: 'I\'m having trouble with a service, what can I do?',
        link: '/services',
        text: 'Find answers to some of the common issues with using the services hosted within DfE Sign-in.',
        updated: 'April 2021',
      },
      {
        title: 'How do I request access to a service?',
        link: '/services',
        text: 'Learn about the process of requesting a service as an end user, along with how long it should take until your request is approved.',
        updated: 'April 2021',
      },
      {
        title: 'Do I need access to services to use DfE Sign-in?',
        link: '/services',
        text: 'Depending on what you intend to do with DfE Sign-in, you may not need access to any services. Learn more here.',
        updated: 'April 2021',
      },
      {
        title: 'How do I add a service to my account?',
        link: '/services',
        text: 'If you\'re an approver, you can add a service to your account quite easily. Find out more here.',
        updated: 'April 2021',
      },
      {
        title: 'Profile',
        link: '/services',
        text: 'Find help with your profile, including how to change your email address and password.',
        updated: 'April 2021',
      },
      {
        title: 'Approvers',
        link: '/services',
        text: 'Find help with approver-related questions, including what an approver is and what they do.',
        updated: 'April 2021',
      },
      {
        title: 'End users',
        link: '/services',
        text: 'Find help with end user-related questions, including how to add a service to an end user.',
        updated: 'April 2021',
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
