export default [
  {
    path: "/",
    name: "contacts",
    component: Contacts,
  },
  {
    path: '*',
    name: 'not-found',
    component: ErrorPage
  }
];
