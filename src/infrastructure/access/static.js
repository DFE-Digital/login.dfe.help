const services = [
  {
    userId: "user1",
    serviceId: "service1",
    roles: [
      {
        id: "roleId",
        name: "test",
        code: "test",
        status: {
          id: 1,
        },
      },
    ],
  },
];

const getSingleUserService = (id, sid, oid, correlationId) =>
  Promise.resolve([]);

module.exports = {
  getSingleUserService,
};
