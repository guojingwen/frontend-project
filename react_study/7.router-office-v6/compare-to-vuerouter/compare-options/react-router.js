export default [
  {
    path: "/contacts",
    element: <Contacts />,
    children: [
      {
        /* 匹配 /contacts/detail/id */
        path: "detail/:contactId",
        /* contactId需要在loader取值 */
        loader: contactLoader,
        element: <ContactDetail />,
      },
    ],
  },

  {
    path: "/about",
    element: <About />,
  }
];
