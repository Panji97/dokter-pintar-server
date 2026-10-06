export default {
  routes: [
    {
      method: 'POST',
      path: '/faskes/register',
      handler: 'faskes.register',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/faskes/staff',
      handler: 'faskes.inviteStaff',
    },
    {
      method: 'GET',
      path: '/faskes/staff',
      handler: 'faskes.listStaff',
    },
  ],
};
