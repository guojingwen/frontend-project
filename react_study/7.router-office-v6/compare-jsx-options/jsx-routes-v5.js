import {
  BrowserRouter,
  Route,
  Link,
  Switch,
} from "react-router-dom";

const rooter = function() {
  return (<BrowserRouter>
    <Route
      path="/"
      /* exact */
      component={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    ></Route>
    <Switch>
      <Route index component={<Index />} />
      <Route
        path="/contacts/:contactId"
        component={<Contact />}
        loader={contactLoader}
        action={contactAction}
      />
      <Route
        path="/contacts/:contactId/edit"
        component={<EditContact />}
      />
    </Switch>
  </BrowserRouter>)
}
