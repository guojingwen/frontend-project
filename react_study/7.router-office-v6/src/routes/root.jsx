import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact  } from "../contacts";
import { useEffect } from "react";

/**
 * 关于 Navigation API
 * 用于替代historyAPI， 因为 window.onpopstate 不能拦截 history.push history.back
 * 它是 Chrome 提出的一套导航 API，提供了操作和拦截导航的能力，以及对应用程序的历史导航记录进行访问。
 * */

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}
export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts--{searching ? 'searching': ''}</h1>
        <div>
        <Form id="search-form" role="search">
          <input
           className={searching ? "loading" : ""}
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={q}
            onChange={(event) => {
              const isFirstSearch = q == null;
              submit(event.currentTarget.form, {
                replace: !isFirstSearch,
              });
            }}
          />
          <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
        </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      
      <div id="detail" className={
          navigation.state === "loading" ? "loading" : ""
        }>
        <Outlet />
      </div>
    </>
  );
}